/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  GradeLevel,
  Stage,
  CharacterConfig,
  PlayerStats,
  Question,
} from './types/game';
import { INITIAL_STAGES, ALL_MEDALS } from './data/curriculumData';
import { WorldMap } from './components/WorldMap';
import { BattleArena } from './components/BattleArena';
import { MedalShowcase } from './components/MedalShowcase';
import { ReviewNotebook } from './components/ReviewNotebook';
import { CharacterCustomizer } from './components/CharacterCustomizer';
import { ParentTeacherGuide } from './components/ParentTeacherGuide';
import { sound } from './utils/sound';
import { Star, Award, RotateCcw, ArrowRight, Home, Volume2, VolumeX } from 'lucide-react';

const STORAGE_KEY_STATS = 'chinese_lego_rpg_stats_v2';
const STORAGE_KEY_CHAR = 'chinese_lego_rpg_char_v2';
const STORAGE_KEY_DIALECT = 'chinese_lego_rpg_dialect_v2';

export default function App() {
  // Game Navigation State
  const [gameState, setGameState] = useState<'MAP' | 'BATTLE' | 'STAGE_VICTORY' | 'STAGE_DEFEAT'>('MAP');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'all'>('all');
  const [activeStage, setActiveStage] = useState<Stage>(INITIAL_STAGES[0]);

  // Dialect state: Mandarin or Cantonese
  const [dialect, setDialect] = useState<'mandarin' | 'cantonese'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DIALECT);
      if (saved === 'mandarin' || saved === 'cantonese') return saved;
    } catch {}
    return 'mandarin';
  });

  // Stages & Progress State
  const [stages, setStages] = useState<Stage[]>(() => {
    return INITIAL_STAGES;
  });

  // Player Character Configuration
  const [character, setCharacter] = useState<CharacterConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHAR);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      name: '小積人小明',
      skinTone: '#facc15',
      hairColor: '#0f172a',
      shirtColor: '#ef4444',
      pantsColor: '#1e3a8a',
      hatStyle: 'knight',
      weaponStyle: 'sword',
    };
  });

  // Player Stats
  const [playerStats, setPlayerStats] = useState<PlayerStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STATS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      hp: 3,
      maxHp: 3,
      gold: 80,
      exp: 0,
      level: 1,
      medals: [],
      completedStages: [],
      stageStars: {},
      wrongQuestions: [],
    };
  });

  // Modal Overlays
  const [showMedals, setShowMedals] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  // Victory result caching
  const [victoryDetails, setVictoryDetails] = useState<{
    stage: Stage;
    stars: number;
    medalTitle?: string;
    medalIcon?: string;
  } | null>(null);

  // Sync dialect with sound synthesizer
  useEffect(() => {
    sound.dialect = dialect;
    try {
      localStorage.setItem(STORAGE_KEY_DIALECT, dialect);
    } catch {}
  }, [dialect]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHAR, JSON.stringify(character));
    } catch {}
  }, [character]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(playerStats));
    } catch {}
  }, [playerStats]);

  const toggleSound = () => {
    const nextState = !isSoundMuted;
    setIsSoundMuted(nextState);
    sound.enabled = !nextState;
    if (nextState) {
      sound.stopSpeaking();
    }
  };

  const handleUpdateGold = (delta: number) => {
    setPlayerStats((prev) => ({
      ...prev,
      gold: Math.max(0, prev.gold + delta),
    }));
  };

  // Start a stage battle
  const handleEnterStage = (stage: Stage) => {
    sound.playClick();
    setActiveStage(stage);
    setGameState('BATTLE');
  };

  // Record a missed question into Review Notebook
  const handleRecordWrongQuestion = (q: Question) => {
    setPlayerStats((prev) => {
      const existing = prev.wrongQuestions.find((item) => item.question.id === q.id);
      if (existing) {
        return {
          ...prev,
          wrongQuestions: prev.wrongQuestions.map((item) =>
            item.question.id === q.id
              ? { ...item, failedCount: item.failedCount + 1, lastFailedAt: Date.now() }
              : item
          ),
        };
      }
      return {
        ...prev,
        wrongQuestions: [
          ...prev.wrongQuestions,
          { question: q, failedCount: 1, lastFailedAt: Date.now() },
        ],
      };
    });
  };

  // Remove question from review once resolved
  const handleRemoveWrongQuestion = (questionId: string) => {
    setPlayerStats((prev) => ({
      ...prev,
      wrongQuestions: prev.wrongQuestions.filter((item) => item.question.id !== questionId),
      exp: prev.exp + 25,
      gold: prev.gold + 10,
    }));
  };

  // Stage Victory Handler
  const handleVictory = (stageId: string, stars: number, medalId: string) => {
    const matchedMedal = ALL_MEDALS.find((m) => m.id === medalId);

    // Update stages: mark completed, unlock next stage
    setStages((prevStages) => {
      const currentIndex = prevStages.findIndex((s) => s.id === stageId);
      return prevStages.map((s, idx) => {
        if (s.id === stageId) {
          return {
            ...s,
            completed: true,
            stars: Math.max(s.stars, stars),
          };
        }
        if (idx === currentIndex + 1) {
          return { ...s, unlocked: true };
        }
        return s;
      });
    });

    // Update Player Stats
    setPlayerStats((prev) => {
      const isNewMedal = !prev.medals.includes(medalId);
      const newMedals = isNewMedal ? [...prev.medals, medalId] : prev.medals;
      const completed = prev.completedStages.includes(stageId)
        ? prev.completedStages
        : [...prev.completedStages, stageId];

      const newExp = prev.exp + 100 * stars;
      const newLevel = Math.floor(newExp / 200) + 1;

      return {
        ...prev,
        hp: prev.maxHp,
        medals: newMedals,
        completedStages: completed,
        stageStars: {
          ...prev.stageStars,
          [stageId]: Math.max(prev.stageStars[stageId] || 0, stars),
        },
        exp: newExp,
        level: newLevel,
        gold: prev.gold + 50 * stars,
      };
    });

    setVictoryDetails({
      stage: activeStage,
      stars,
      medalTitle: matchedMedal?.title,
      medalIcon: matchedMedal?.icon,
    });

    setGameState('STAGE_VICTORY');
  };

  // Stage Defeat Handler
  const handleDefeat = () => {
    setGameState('STAGE_DEFEAT');
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col">
      {/* Global Sound Toggle Floating Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleSound}
          className="p-3 bg-slate-900/90 border border-slate-700 rounded-full shadow-2xl text-slate-300 hover:text-white hover:bg-slate-800 transition-all active:scale-90"
          title={isSoundMuted ? '開啟音效' : '靜音'}
        >
          {isSoundMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-amber-400" />}
        </button>
      </div>

      {/* 1. MAP STATE */}
      {gameState === 'MAP' && (
        <WorldMap
          stages={stages}
          character={character}
          playerStats={playerStats}
          selectedGrade={selectedGrade}
          dialect={dialect}
          onDialectChange={setDialect}
          onSelectGrade={setSelectedGrade}
          onEnterStage={handleEnterStage}
          onOpenMedals={() => setShowMedals(true)}
          onOpenReview={() => setShowReview(true)}
          onOpenCustomizer={() => setShowCustomizer(true)}
          onOpenGuide={() => setShowGuide(true)}
        />
      )}

      {/* 2. BATTLE STATE */}
      {gameState === 'BATTLE' && (
        <BattleArena
          stage={activeStage}
          character={character}
          playerStats={playerStats}
          dialect={dialect}
          onDialectChange={setDialect}
          onUpdateGold={handleUpdateGold}
          onVictory={handleVictory}
          onDefeat={handleDefeat}
          onExit={() => setGameState('MAP')}
          onRecordWrongQuestion={handleRecordWrongQuestion}
        />
      )}

      {/* 3. STAGE VICTORY SCREEN */}
      {gameState === 'STAGE_VICTORY' && victoryDetails && (
        <div className="flex-1 flex items-center justify-center p-4 bg-lego-grid animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-slate-900 border-2 border-amber-400/80 rounded-3xl p-6 sm:p-8 text-center shadow-2xl flex flex-col items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-4xl shadow-lg shadow-amber-500/30 animate-bounce">
              🏆
            </div>

            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
                VICTORY · 關卡大捷！
              </div>
              <h2 className="text-2xl font-black text-white">
                成功擊敗【{victoryDetails.stage.monster.name}】！
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {victoryDetails.stage.name} · {victoryDetails.stage.chapter}
              </p>
            </div>

            {/* Stars Won */}
            <div className="flex items-center gap-2 p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
              {[1, 2, 3].map((starIdx) => (
                <Star
                  key={starIdx}
                  className={`w-8 h-8 ${
                    starIdx <= victoryDetails.stars
                      ? 'fill-amber-400 text-amber-400 animate-pulse'
                      : 'fill-slate-800 text-slate-700'
                  }`}
                />
              ))}
            </div>

            {/* Medal Awarded */}
            {victoryDetails.medalTitle && (
              <div className="w-full p-4 bg-amber-950/20 border border-amber-500/40 rounded-2xl flex items-center gap-4 text-left">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-3xl shrink-0 shadow">
                  {victoryDetails.medalIcon}
                </div>
                <div>
                  <div className="text-[10px] font-bold text-amber-400 uppercase">
                    獲得全新冒險勳章！
                  </div>
                  <h4 className="font-extrabold text-sm text-white">
                    {victoryDetails.medalTitle}
                  </h4>
                  <div className="text-xs text-slate-300">
                    已收錄至你的「勳章榮譽館」，隨時可檢視成就！
                  </div>
                </div>
              </div>
            )}

            {/* Exp and Gold Rewards */}
            <div className="grid grid-cols-2 gap-3 w-full text-xs">
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <span className="text-slate-400 block mb-0.5">獲得冒險經驗值</span>
                <strong className="text-base text-sky-400 font-black">
                  +{100 * victoryDetails.stars} EXP
                </strong>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <span className="text-slate-400 block mb-0.5">獲得積木金幣</span>
                <strong className="text-base text-amber-400 font-black">
                  +{50 * victoryDetails.stars} G
                </strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setGameState('MAP');
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>返回地圖</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  const nextIndex = stages.findIndex((s) => s.id === activeStage.id) + 1;
                  if (nextIndex < stages.length) {
                    setActiveStage(stages[nextIndex]);
                    setGameState('BATTLE');
                  } else {
                    setGameState('MAP');
                  }
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 rounded-xl shadow-lg shadow-amber-500/25 transition-all active:scale-95"
              >
                <span>下一關挑戰</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. STAGE DEFEAT SCREEN */}
      {gameState === 'STAGE_DEFEAT' && (
        <div className="flex-1 flex items-center justify-center p-4 bg-lego-grid animate-in fade-in duration-300">
          <div className="relative w-full max-w-md bg-slate-900 border-2 border-rose-500/60 rounded-3xl p-6 sm:p-8 text-center shadow-2xl flex flex-col items-center gap-5">
            <div className="w-18 h-18 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-4xl shadow-inner">
              ❤️‍🩹
            </div>

            <div>
              <div className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-1">
                CHALLENGE FAILED · 體力耗盡
              </div>
              <h2 className="text-xl font-black text-white">
                怪獸發動了強烈反擊！
              </h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                不要氣餒！資深陳老師提醒：每次答錯的題目都已自動記錄在「錯題筆記本」中。仔細複習解題策略，調整狀態隨時可以重新發起挑戰！
              </p>
            </div>

            <div className="flex items-center gap-3 w-full pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setGameState('MAP');
                }}
                className="flex-1 py-3 px-4 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
              >
                返回地圖休整
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setPlayerStats((prev) => ({ ...prev, hp: prev.maxHp }));
                  setGameState('BATTLE');
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white rounded-xl shadow-lg shadow-rose-500/20 transition-all active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>滿血再次挑戰！</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Modals */}
      {showMedals && (
        <MedalShowcase
          medals={ALL_MEDALS}
          unlockedMedalIds={playerStats.medals}
          onClose={() => setShowMedals(false)}
        />
      )}

      {showReview && (
        <ReviewNotebook
          wrongQuestions={playerStats.wrongQuestions}
          onRemoveQuestion={handleRemoveWrongQuestion}
          onClose={() => setShowReview(false)}
        />
      )}

      {showCustomizer && (
        <CharacterCustomizer
          config={character}
          onSave={setCharacter}
          onClose={() => setShowCustomizer(false)}
        />
      )}

      {showGuide && <ParentTeacherGuide onClose={() => setShowGuide(false)} />}
    </div>
  );
}
