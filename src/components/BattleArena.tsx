import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Stage, Question, CharacterConfig, PlayerStats, BattleItem, BattleItemId } from '../types/game';
import { BATTLE_ITEMS } from '../data/curriculumData';
import { BlockCharacter } from './BlockCharacter';
import { MonsterSprite } from './MonsterSprite';
import { TeacherTipModal } from './TeacherTipModal';
import { sound } from '../utils/sound';
import { shuffleSentenceWords, shuffleArray } from '../utils/shuffle';
import {
  Heart,
  Volume2,
  Sparkles,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  Award,
  Zap,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Shield,
  ShoppingBag,
  Coins,
  RefreshCw,
} from 'lucide-react';

interface BattleArenaProps {
  stage: Stage;
  character: CharacterConfig;
  playerStats: PlayerStats;
  dialect: 'mandarin' | 'cantonese';
  onDialectChange: (d: 'mandarin' | 'cantonese') => void;
  onUpdateGold: (delta: number) => void;
  onVictory: (stageId: string, stars: number, medalId: string) => void;
  onDefeat: () => void;
  onExit: () => void;
  onRecordWrongQuestion: (q: Question) => void;
}

export const BattleArena: React.FC<BattleArenaProps> = ({
  stage,
  character,
  playerStats,
  dialect,
  onDialectChange,
  onUpdateGold,
  onVictory,
  onDefeat,
  onExit,
  onRecordWrongQuestion,
}) => {
  // Question sequence state (allows dynamic re-shuffling)
  const [questionsPool, setQuestionsPool] = useState<Question[]>(() => {
    return [...stage.questions];
  });
  const [currentQIndex, setCurrentQIndex] = useState(0);

  // Health and Gold states
  const [monsterHp, setMonsterHp] = useState(stage.monster.maxHp);
  const [playerHp, setPlayerHp] = useState(playerStats.hp);

  // Consumable Buffs Active State
  const [isDoubleAtkActive, setIsDoubleAtkActive] = useState(false);
  const [isShieldActive, setIsShieldActive] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [showItemDrawer, setShowItemDrawer] = useState(false);

  // Animation states
  const [heroAction, setHeroAction] = useState<'idle' | 'attack' | 'hurt' | 'victory'>('idle');
  const [monsterAction, setMonsterAction] = useState<'idle' | 'attack' | 'hurt' | 'defeated'>('idle');
  const [battleMessage, setBattleMessage] = useState<string>(`野生的【${stage.monster.name}】出現了！準備答題發動攻擊！`);
  const [floatingDamage, setFloatingDamage] = useState<{ target: 'hero' | 'monster'; amount: number; text: string } | null>(null);

  // Question solving state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [sentenceArranged, setSentenceArranged] = useState<string[]>([]);
  const [shuffledWordChips, setShuffledWordChips] = useState<string[]>([]);
  const [paragraphSlots, setParagraphSlots] = useState<string[]>([]);
  const [showPassage, setShowPassage] = useState<boolean>(true);
  const [showTipModal, setShowTipModal] = useState<boolean>(false);
  const [isWrongAnswerModal, setIsWrongAnswerModal] = useState<boolean>(false);
  const [isAnswerLocked, setIsAnswerLocked] = useState<boolean>(false);

  const currentQ = questionsPool[currentQIndex] || stage.questions[0];

  // Scramble word tiles and reset interaction on question switch
  useEffect(() => {
    setSelectedOption(null);
    setParagraphSlots([]);
    setEliminatedOptions([]);
    setIsAnswerLocked(false);
    setShowPassage(true);

    if (currentQ?.category === 'reorder_sentence' && currentQ.wordsToArrange) {
      setShuffledWordChips(shuffleSentenceWords(currentQ.wordsToArrange));
      setSentenceArranged([]);
    }
  }, [currentQIndex, currentQ]);

  // Clean speech on unmount
  useEffect(() => {
    return () => {
      sound.stopSpeaking();
    };
  }, []);

  // Dynamic question shuffle / refresh handler
  const handleRefreshQuestions = () => {
    sound.playClick();
    const shuffled = shuffleArray(stage.questions);
    setQuestionsPool(shuffled);
    setCurrentQIndex(0);
    setBattleMessage('🔄 題目庫已重新洗牌抽題！準備好迎接新挑戰！');
  };

  // Buy & use consumable battle item
  const handleUseItem = (item: BattleItem) => {
    sound.playClick();
    if (playerStats.gold < item.cost) {
      setBattleMessage(`⚠️ 金幣不足！需要 ${item.cost} 金幣，目前擁有 ${playerStats.gold} 金幣。`);
      return;
    }

    onUpdateGold(-item.cost);

    switch (item.id) {
      case 'double_atk':
        setIsDoubleAtkActive(true);
        setBattleMessage('⚔️ 喝下了「攻擊加倍藥水」！下一題答對將造成雙倍暴擊傷害！');
        break;
      case 'shield':
        setIsShieldActive(true);
        setBattleMessage('🛡️ 裝備了「積木守護盾牌」！可免疫怪獸的下一次反擊！');
        break;
      case 'heal_heart':
        if (playerHp < playerStats.maxHp) {
          setPlayerHp((prev) => Math.min(playerStats.maxHp, prev + 1));
          setBattleMessage('💖 使用「愛心急救包」，回復了 1 顆愛心體力！');
        } else {
          setBattleMessage('💖 體力已是滿格狀態！');
        }
        break;
      case 'eliminate_two':
        if (currentQ.options && currentQ.correctOption) {
          const wrongs = currentQ.options
            .map((o) => o.label)
            .filter((l) => l !== currentQ.correctOption);
          const toEliminate = shuffleArray(wrongs).slice(0, 2);
          setEliminatedOptions(toEliminate);
          setBattleMessage('🪄 發動「文曲星排除卡」！已排除 2 個錯誤干擾選項！');
        } else {
          setBattleMessage('🪄 此題目類型不支援排除選項！');
        }
        break;
      case 'skip_q':
        setBattleMessage('📜 展開「智慧直通卷軸」！文曲星直接破題發動強襲！');
        triggerAttackSuccess(true);
        break;
    }
  };

  const triggerAttackSuccess = (isSkip = false) => {
    setIsAnswerLocked(true);
    sound.playCorrect();
    setHeroAction('attack');

    const multiplier = isDoubleAtkActive ? 2 : 1;
    if (isDoubleAtkActive) setIsDoubleAtkActive(false);

    setBattleMessage(
      isSkip
        ? `📜 智慧卷軸神光降臨！直破當前難題！造成強力攻擊！`
        : `✨ 太棒了！回答正確！${character.name} 發動了${multiplier > 1 ? '【雙倍暴擊】' : ''}積木語文神擊！`
    );

    const baseDamage = Math.ceil(stage.monster.maxHp / questionsPool.length);
    const damage = baseDamage * multiplier;

    setTimeout(() => {
      sound.playAttack();
    }, 150);

    setTimeout(() => {
      sound.playMonsterHit();
      setMonsterAction('hurt');
      setFloatingDamage({ target: 'monster', amount: damage, text: `-${damage} HP! ${multiplier > 1 ? '💥暴擊' : ''}` });

      setMonsterHp((prev) => {
        const nextHp = Math.max(0, prev - damage);
        if (nextHp === 0 || currentQIndex >= questionsPool.length - 1) {
          setTimeout(() => {
            handleVictory();
          }, 800);
        } else {
          setTimeout(() => {
            setMonsterAction('idle');
            setHeroAction('idle');
            setFloatingDamage(null);
            setCurrentQIndex((prevQ) => prevQ + 1);
            setBattleMessage('🎯 擊中怪獸！繼續保持專注，答對下一題乘勝追擊！');
          }, 1100);
        }
        return nextHp;
      });
    }, 450);
  };

  const triggerWrongAnswer = () => {
    setIsAnswerLocked(true);
    sound.playWrong();
    onRecordWrongQuestion(currentQ);

    if (isShieldActive) {
      setIsShieldActive(false);
      setBattleMessage(`🛡️ 守護盾牌金光大盛！完全抵擋了【${stage.monster.name}】的反擊，未受到傷害！`);
      setTimeout(() => {
        setIsWrongAnswerModal(true);
        setShowTipModal(true);
      }, 500);
      return;
    }

    setBattleMessage(`💥 哎呀，答錯了！【${stage.monster.name}】發動反擊：${stage.monster.attackName}！`);

    setTimeout(() => {
      sound.playMonsterAttack();
      setMonsterAction('attack');
    }, 200);

    setTimeout(() => {
      sound.playPlayerHurt();
      setHeroAction('hurt');
      setFloatingDamage({ target: 'hero', amount: 1, text: '-1 ❤️' });

      setPlayerHp((prev) => {
        const nextHp = Math.max(0, prev - 1);
        if (nextHp <= 0) {
          setTimeout(() => {
            onDefeat();
          }, 1000);
        } else {
          setTimeout(() => {
            setHeroAction('idle');
            setMonsterAction('idle');
            setFloatingDamage(null);
            setIsWrongAnswerModal(true);
            setShowTipModal(true);
          }, 600);
        }
        return nextHp;
      });
    }, 550);
  };

  const handleVictory = () => {
    setMonsterAction('defeated');
    setHeroAction('victory');
    sound.playVictory();

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
    });

    const starsEarned = playerHp === 3 ? 3 : playerHp >= 2 ? 2 : 1;
    setTimeout(() => {
      onVictory(stage.id, starsEarned, stage.rewardMedalId);
    }, 1200);
  };

  // Multiple Choice Handler
  const handleSelectOption = (label: string) => {
    if (isAnswerLocked || eliminatedOptions.includes(label)) return;
    sound.playClick();
    setSelectedOption(label);
    if (label === currentQ.correctOption) {
      triggerAttackSuccess();
    } else {
      triggerWrongAnswer();
    }
  };

  // Sentence Reordering Chip Handler
  const handleToggleSentenceChip = (word: string) => {
    if (isAnswerLocked) return;
    sound.playClick();
    if (sentenceArranged.includes(word)) {
      setSentenceArranged(sentenceArranged.filter((w) => w !== word));
    } else {
      setSentenceArranged([...sentenceArranged, word]);
    }
  };

  const handleSubmitSentence = () => {
    if (isAnswerLocked || !currentQ.correctOrderWords) return;
    const isCorrect =
      sentenceArranged.length === currentQ.correctOrderWords.length &&
      sentenceArranged.every((w, idx) => w === currentQ.correctOrderWords![idx]);

    if (isCorrect) {
      triggerAttackSuccess();
    } else {
      triggerWrongAnswer();
    }
  };

  // Paragraph Reordering Handler
  const handleToggleParagraphId = (id: string) => {
    if (isAnswerLocked) return;
    sound.playClick();
    if (paragraphSlots.includes(id)) {
      setParagraphSlots(paragraphSlots.filter((x) => x !== id));
    } else {
      setParagraphSlots([...paragraphSlots, id]);
    }
  };

  const handleSubmitParagraph = () => {
    if (isAnswerLocked || !currentQ.correctOrderIds) return;
    const isCorrect =
      paragraphSlots.length === currentQ.correctOrderIds.length &&
      paragraphSlots.every((id, idx) => id === currentQ.correctOrderIds![idx]);

    if (isCorrect) {
      triggerAttackSuccess();
    } else {
      triggerWrongAnswer();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-lego-grid text-slate-100">
      {/* Top HUD */}
      <header className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 backdrop-blur sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <button
            onClick={onExit}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>地圖</span>
          </button>

          {/* Dialect Selector Button */}
          <div className="flex items-center gap-1 p-0.5 bg-slate-950 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => {
                sound.playClick();
                onDialectChange('mandarin');
              }}
              className={`px-2 py-1 rounded font-bold transition-colors ${
                dialect === 'mandarin' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
              title="切換為標準國語女聲朗讀"
            >
              國語(女聲)
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onDialectChange('cantonese');
              }}
              className={`px-2 py-1 rounded font-bold transition-colors ${
                dialect === 'cantonese' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
              title="切換為廣東話朗讀"
            >
              廣東話
            </button>
          </div>
        </div>

        <div className="text-center">
          <div className="text-xs text-amber-400 font-semibold">{stage.chapter}</div>
          <div className="text-sm font-bold text-white flex items-center justify-center gap-2">
            <span>{stage.name}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700">
              第 {currentQIndex + 1} / {questionsPool.length} 題
            </span>
          </div>
        </div>

        {/* Right HUD Controls: Gold, Items, Teacher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-lg text-amber-300 text-xs font-bold">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>{playerStats.gold} G</span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setShowItemDrawer(!showItemDrawer);
            }}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
              showItemDrawer
                ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                : 'bg-purple-950/60 text-purple-200 border-purple-500/40 hover:bg-purple-900/60'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>戰鬥道具</span>
          </button>

          <button
            onClick={handleRefreshQuestions}
            className="flex items-center gap-1 p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
            title="更新題目庫隨機抽題"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              setIsWrongAnswerModal(false);
              setShowTipModal(true);
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-amber-300 bg-amber-950/60 border border-amber-500/40 rounded-lg hover:bg-amber-900/60 transition-colors"
          >
            👨‍🏫 老師錦囊
          </button>
        </div>
      </header>

      {/* Item Shop / Inventory Dropdown Panel */}
      {showItemDrawer && (
        <div className="bg-slate-900/95 border-b border-purple-500/30 px-4 py-3 shadow-xl backdrop-blur animate-in slide-in-from-top-3 duration-200">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-purple-300">🎒 戰鬥道具箱（消耗金幣購買）</span>
                <span className="text-xs text-amber-300">餘額：{playerStats.gold} G</span>
              </div>
              <p className="text-xs text-slate-400">
                面對強大怪獸，靈活運用道具能逆轉戰局！
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {BATTLE_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleUseItem(item)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-purple-400 text-xs transition-all active:scale-95 shadow"
                  title={item.description}
                >
                  <span className="text-base">{item.icon}</span>
                  <div className="text-left">
                    <div className="font-bold text-slate-100">{item.name}</div>
                    <div className="text-[10px] text-amber-400 font-mono">{item.cost} G</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Battle Scene (Hero vs Monster) */}
      <div className="relative w-full max-w-5xl mx-auto px-4 pt-3 pb-2">
        <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 p-4 shadow-xl overflow-hidden min-h-[200px] flex items-center justify-between">
          {/* Active Buff Badges */}
          <div className="absolute top-2.5 left-4 flex items-center gap-2 z-20">
            {isDoubleAtkActive && (
              <span className="flex items-center gap-1 text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full shadow animate-pulse">
                ⚔️ 2x 雙倍攻擊蓄力中
              </span>
            )}
            {isShieldActive && (
              <span className="flex items-center gap-1 text-[11px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40 px-2 py-0.5 rounded-full shadow">
                🛡️ 守護盾牌生效中
              </span>
            )}
          </div>

          {/* Left: Player Hero */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-2 text-center">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1 justify-center">
                <span>Lv.1</span>
                <span>{character.name}</span>
              </div>
              <div className="flex items-center gap-1 mt-1 justify-center">
                {[1, 2, 3].map((heart) => (
                  <Heart
                    key={heart}
                    className={`w-5 h-5 transition-transform ${
                      heart <= playerHp
                        ? 'fill-rose-500 text-rose-500 scale-100'
                        : 'fill-slate-700 text-slate-600 scale-90'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative">
              <BlockCharacter
                config={character}
                actionState={heroAction}
                size="lg"
                direction="right"
              />
              {floatingDamage?.target === 'hero' && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-rose-400 font-extrabold text-lg animate-bounce drop-shadow">
                  {floatingDamage.text}
                </div>
              )}
            </div>
          </div>

          {/* Center: VS & Battle Log */}
          <div className="flex flex-col items-center text-center px-4 max-w-xs z-10">
            <div className="w-9 h-9 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center font-black text-amber-400 text-xs shadow-inner mb-2">
              VS
            </div>
            <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-300 leading-snug shadow">
              {battleMessage}
            </div>
          </div>

          {/* Right: Monster */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-2 text-center">
              <div className="text-xs font-bold text-slate-200">{stage.monster.name}</div>
              <div className="text-[10px] text-slate-400">{stage.monster.title}</div>
              {/* HP Bar */}
              <div className="w-28 h-3 bg-slate-800 rounded-full border border-slate-700 overflow-hidden mt-1 p-0.5">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${(monsterHp / stage.monster.maxHp) * 100}%`,
                    backgroundColor: stage.monster.themeColor,
                  }}
                />
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                {monsterHp} / {stage.monster.maxHp} HP
              </div>
            </div>

            <div className="relative">
              <MonsterSprite
                monster={stage.monster}
                actionState={monsterAction}
                size="lg"
              />
              {floatingDamage?.target === 'monster' && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-amber-400 font-extrabold text-xl animate-bounce drop-shadow">
                  {floatingDamage.text}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Challenge Arena & Question Panel */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 pb-8 flex flex-col gap-4">
        {/* If this is a Reading Comprehension Question with a Passage */}
        {currentQ?.readingPassage && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span className="font-bold text-white text-sm">
                  【課文閱讀】《{currentQ.readingPassage.title}》
                </span>
                {currentQ.readingPassage.author && (
                  <span className="text-xs text-slate-400">（{currentQ.readingPassage.author}）</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const text = currentQ.readingPassage?.paragraphs.join(' ');
                    if (text) sound.speakText(text, dialect);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs bg-sky-950/70 text-sky-300 border border-sky-600/40 rounded-lg hover:bg-sky-900/70 transition-all active:scale-95"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>朗讀課文（{dialect === 'cantonese' ? '廣東話' : '國語女聲'}）</span>
                </button>
                <button
                  onClick={() => setShowPassage(!showPassage)}
                  className="p-1 text-slate-400 hover:text-white rounded"
                >
                  {showPassage ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {showPassage && (
              <div className="mt-3 space-y-2 text-sm text-slate-200 leading-relaxed max-h-56 overflow-y-auto pr-2">
                {currentQ.readingPassage.paragraphs.map((p, idx) => (
                  <p key={idx} className="indent-6">
                    {p}
                  </p>
                ))}

                {/* Vocabulary with Mandarin Pinyin */}
                {currentQ.readingPassage.pinyinVocab && currentQ.readingPassage.pinyinVocab.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs">
                    <span className="text-amber-400 font-medium">【生字拼音角】：</span>
                    {currentQ.readingPassage.pinyinVocab.map((v, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300"
                      >
                        <strong className="text-white">{v.word}</strong>（{v.pinyin}）：{v.def}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Question Interaction Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-sky-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                {currentQ?.instruction}
              </span>
              <button
                onClick={() => sound.speakText(currentQ?.prompt, dialect)}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-sky-300 p-1"
                title="朗讀題目"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>朗讀題目</span>
              </button>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-snug">
              {currentQ?.prompt}
            </h3>

            {/* --- TYPE 1: MULTIPLE CHOICE --- */}
            {currentQ?.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt) => {
                  const isEliminated = eliminatedOptions.includes(opt.label);
                  return (
                    <button
                      key={opt.label}
                      disabled={isAnswerLocked || isEliminated}
                      onClick={() => handleSelectOption(opt.label)}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all duration-150 ${
                        isEliminated
                          ? 'opacity-30 line-through bg-slate-950/40 border-slate-900 cursor-not-allowed'
                          : selectedOption === opt.label
                          ? opt.label === currentQ.correctOption
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-100 shadow-md shadow-emerald-500/10'
                            : 'bg-rose-950/70 border-rose-500 text-rose-100'
                          : 'bg-slate-800/70 hover:bg-slate-800 border-slate-700 hover:border-slate-600 text-slate-200'
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                          isEliminated
                            ? 'bg-slate-800 text-slate-600'
                            : selectedOption === opt.label
                            ? opt.label === currentQ.correctOption
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-rose-500 text-white'
                            : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {opt.label}
                      </span>
                      <span className="text-sm font-medium leading-relaxed">{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* --- TYPE 2: SENTENCE REORDERING (積木拼詞 - 打亂組合) --- */}
            {currentQ?.category === 'reorder_sentence' && currentQ.wordsToArrange && (
              <div className="space-y-4">
                {/* Assembled Sentence Bar */}
                <div className="p-4 bg-slate-950/80 rounded-xl border-2 border-dashed border-sky-500/40 min-h-[70px] flex flex-wrap items-center gap-2">
                  {sentenceArranged.length === 0 ? (
                    <span className="text-slate-500 text-xs italic">
                      👇 點選下方打亂的詞語積木，依序組裝成完整通順句子！
                    </span>
                  ) : (
                    sentenceArranged.map((word, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleToggleSentenceChip(word)}
                        className="px-3 py-1.5 text-sm font-bold bg-sky-500 text-slate-950 rounded-lg shadow-md border-b-2 border-sky-700 hover:bg-sky-400 active:scale-95 transition-transform flex items-center gap-1"
                      >
                        <span>{word}</span>
                        <span className="text-[10px] text-sky-900 opacity-60">✕</span>
                      </button>
                    ))
                  )}
                </div>

                {/* Available Lego Bricks Tray (Randomly Shuffled) */}
                <div>
                  <div className="text-xs text-slate-400 mb-2">點擊挑選詞語積木：</div>
                  <div className="flex flex-wrap gap-2.5">
                    {shuffledWordChips.map((word, idx) => {
                      const isUsed = sentenceArranged.includes(word);
                      return (
                        <button
                          key={idx}
                          disabled={isUsed || isAnswerLocked}
                          onClick={() => handleToggleSentenceChip(word)}
                          className={`relative px-4 py-2 text-sm font-bold rounded-xl transition-all shadow-md ${
                            isUsed
                              ? 'bg-slate-800 text-slate-600 border border-slate-800 cursor-not-allowed opacity-40'
                              : 'bg-amber-400 text-slate-950 border-b-4 border-amber-600 hover:bg-amber-300 active:translate-y-1 active:border-b-0 hover:scale-105'
                          }`}
                        >
                          <span className="absolute -top-1.5 left-3 w-3 h-1.5 rounded-full bg-amber-300 border border-amber-500" />
                          <span className="absolute -top-1.5 right-3 w-3 h-1.5 rounded-full bg-amber-300 border border-amber-500" />
                          {word}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setSentenceArranged([])}
                    disabled={sentenceArranged.length === 0 || isAnswerLocked}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>清除重排</span>
                  </button>

                  <button
                    onClick={handleSubmitSentence}
                    disabled={sentenceArranged.length === 0 || isAnswerLocked}
                    className="flex items-center gap-1.5 px-6 py-2.5 text-sm font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                  >
                    <Zap className="w-4 h-4 fill-slate-950" />
                    <span>組合完成，發動攻擊！</span>
                  </button>
                </div>
              </div>
            )}

            {/* --- TYPE 3: PARAGRAPH REORDERING (排句成段) --- */}
            {currentQ?.category === 'reorder_paragraph' && currentQ.paragraphSegments && (
              <div className="space-y-4">
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">目前段落順序：</span>
                  <div className="flex items-center gap-2">
                    {paragraphSlots.length === 0 ? (
                      <span className="text-xs text-slate-500">請按邏輯順序點選下方句子卡片</span>
                    ) : (
                      paragraphSlots.map((id, idx) => (
                        <span key={idx} className="flex items-center gap-1 font-bold text-amber-400 text-sm">
                          <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold text-xs shadow">
                            {id}
                          </span>
                          {idx < paragraphSlots.length - 1 && <span className="text-slate-500">➔</span>}
                        </span>
                      ))
                    )}
                  </div>
                  <button
                    onClick={() => setParagraphSlots([])}
                    disabled={paragraphSlots.length === 0 || isAnswerLocked}
                    className="text-xs text-slate-400 hover:text-slate-200"
                  >
                    重置
                  </button>
                </div>

                <div className="space-y-2">
                  {currentQ.paragraphSegments.map((seg) => {
                    const isSelected = paragraphSlots.includes(seg.id);
                    const slotOrder = paragraphSlots.indexOf(seg.id) + 1;
                    return (
                      <button
                        key={seg.id}
                        disabled={isAnswerLocked}
                        onClick={() => handleToggleParagraphId(seg.id)}
                        className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-amber-950/40 border-amber-500/80 text-amber-100 shadow'
                            : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-200'
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {seg.id}
                        </span>
                        <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
                          {seg.text}
                        </div>
                        {isSelected && (
                          <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shrink-0">
                            順序 {slotOrder}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleSubmitParagraph}
                    disabled={paragraphSlots.length !== currentQ.paragraphSegments.length || isAnswerLocked}
                    className="flex items-center gap-1.5 px-6 py-2.5 text-sm font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>排序完成，擊破怪獸！</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Teacher Prompt at Bottom */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 text-slate-400">
              💡 遇到困難？點選右上角「👨‍🏫 老師錦囊」獲取解析與秘訣！
            </span>
            <span className="text-amber-400 font-medium">怪獸弱點：{stage.monster.weakness}</span>
          </div>
        </div>
      </main>

      {/* Teacher Tip Modal */}
      {showTipModal && (
        <TeacherTipModal
          question={currentQ}
          isWrongAnswerExplanation={isWrongAnswerModal}
          onClose={() => {
            setShowTipModal(false);
            setIsAnswerLocked(false);
          }}
          onRetry={() => {
            setShowTipModal(false);
            setIsAnswerLocked(false);
            setSelectedOption(null);
            setSentenceArranged([]);
            setParagraphSlots([]);
          }}
        />
      )}
    </div>
  );
};
