import React, { useState } from 'react';
import { Stage, CharacterConfig, PlayerStats, GradeLevel } from '../types/game';
import { BlockCharacter } from './BlockCharacter';
import { sound } from '../utils/sound';
import {
  Star,
  Lock,
  Play,
  Award,
  BookOpen,
  Palette,
  Heart,
  Compass,
  Sparkles,
  Volume2,
} from 'lucide-react';

interface WorldMapProps {
  stages: Stage[];
  character: CharacterConfig;
  playerStats: PlayerStats;
  selectedGrade: GradeLevel | 'all';
  dialect: 'mandarin' | 'cantonese';
  onDialectChange: (d: 'mandarin' | 'cantonese') => void;
  onSelectGrade: (grade: GradeLevel | 'all') => void;
  onEnterStage: (stage: Stage) => void;
  onOpenMedals: () => void;
  onOpenReview: () => void;
  onOpenCustomizer: () => void;
  onOpenGuide: () => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  stages,
  character,
  playerStats,
  selectedGrade,
  dialect,
  onDialectChange,
  onSelectGrade,
  onEnterStage,
  onOpenMedals,
  onOpenReview,
  onOpenCustomizer,
  onOpenGuide,
}) => {
  const [activeStage, setActiveStage] = useState<Stage>(stages[0]);
  const [isWalking, setIsWalking] = useState(false);
  const [showStageModal, setShowStageModal] = useState(false);

  const filteredStages =
    selectedGrade === 'all'
      ? stages
      : stages.filter((s) => s.grade === selectedGrade);

  const handleStageClick = (stage: Stage) => {
    sound.playClick();
    if (!stage.unlocked) return;

    if (activeStage.id !== stage.id) {
      setIsWalking(true);
      setActiveStage(stage);
      setTimeout(() => {
        setIsWalking(false);
        setShowStageModal(true);
      }, 500);
    } else {
      setShowStageModal(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-lego-grid text-slate-100">
      {/* Top Header Bar */}
      <header className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 backdrop-blur sticky top-0 z-40">
        {/* Brand & Hero Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl shadow-inner">
            🧱
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
              <span>語文積木大冒險</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                國小語文奇幻冒險RPG
              </span>
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>小英雄：<strong className="text-white">{character.name}</strong></span>
              <span>·</span>
              <span className="text-amber-400 font-bold">Lv.{playerStats.level}</span>
            </div>
          </div>
        </div>

        {/* Global Controls & Meters */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs font-medium flex-wrap">
          {/* Dialect Selector */}
          <div className="flex items-center gap-1 p-0.5 bg-slate-950 rounded-lg border border-slate-700">
            <button
              onClick={() => {
                sound.playClick();
                onDialectChange('mandarin');
              }}
              className={`px-2 py-1 rounded font-bold transition-colors ${
                dialect === 'mandarin' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
              title="標準國語女聲朗讀"
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
              title="廣東話朗讀語音"
            >
              廣東話
            </button>
          </div>

          {/* HP Hearts */}
          <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-xl border border-slate-700">
            {[1, 2, 3].map((heart) => (
              <Heart
                key={heart}
                className={`w-3.5 h-3.5 ${
                  heart <= playerStats.hp ? 'fill-rose-500 text-rose-500' : 'fill-slate-700 text-slate-600'
                }`}
              />
            ))}
          </div>

          {/* Gold */}
          <div className="bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-xl text-amber-300 font-bold">
            💰 {playerStats.gold} G
          </div>

          {/* Medals */}
          <button
            onClick={onOpenMedals}
            className="flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1 rounded-xl border border-amber-500/30 text-amber-300 transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>勳章 ({playerStats.medals.length})</span>
          </button>

          {/* Review Notebook */}
          <button
            onClick={onOpenReview}
            className="flex items-center gap-1 bg-sky-500/10 hover:bg-sky-500/20 px-2.5 py-1 rounded-xl border border-sky-500/30 text-sky-300 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            <span>錯題本 ({playerStats.wrongQuestions.length})</span>
          </button>

          {/* Customizer */}
          <button
            onClick={onOpenCustomizer}
            className="flex items-center gap-1 bg-purple-950/40 hover:bg-purple-900/40 px-2.5 py-1 rounded-xl border border-purple-500/30 text-purple-300 transition-colors"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>換裝</span>
          </button>

          {/* Guide */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1 bg-emerald-950/40 hover:bg-emerald-900/40 px-2.5 py-1 rounded-xl border border-emerald-500/30 text-emerald-300 transition-colors"
          >
            <span>👨‍🏫 伴學指南</span>
          </button>
        </div>
      </header>

      {/* Grade Selector Tabs */}
      <div className="bg-slate-900/70 border-b border-slate-800 px-4 py-2 backdrop-blur">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => onSelectGrade('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                selectedGrade === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              全部大陸關卡
            </button>
            {([1, 2, 3, 4, 5, 6] as GradeLevel[]).map((g) => (
              <button
                key={g}
                onClick={() => onSelectGrade(g)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                  selectedGrade === g
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {g}年級
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400 hidden md:block">
            <span>🗺️ 點擊地圖上的關卡標記，小積人將邁步前往挑戰！</span>
          </div>
        </div>
      </div>

      {/* Fantasy World Map (Directly Styled After the Uploaded Image) */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 flex flex-col justify-center">
        {/* Outer Parchment Container with Clouds & Compass */}
        <div className="relative w-full rounded-3xl bg-[#09222c] border-4 border-[#b4884d] shadow-[0_12px_40px_rgba(0,0,0,0.8)] overflow-hidden min-h-[640px] sm:min-h-[700px] flex flex-col justify-between">
          
          {/* ================= SVG FANTASY MAP GRAPHICS ================= */}
          <svg
            viewBox="0 0 1000 750"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
          >
            <defs>
              {/* Ocean Radial & Linear Gradients */}
              <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0b3846" />
                <stop offset="40%" stopColor="#082b37" />
                <stop offset="100%" stopColor="#051c24" />
              </linearGradient>

              {/* Shallow Waters Coast Glow */}
              <filter id="coastalGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Volcano Magma Glow */}
              <radialGradient id="magmaGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff4500" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#dc2626" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#991b1b" stopOpacity="0" />
              </radialGradient>

              {/* Snow Peak Gradient */}
              <linearGradient id="snowGrad" x1="0%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#e0f2fe" />
                <stop offset="100%" stopColor="#7dd3fc" />
              </linearGradient>

              {/* Continent Landmass Texture Pattern */}
              <radialGradient id="landGreen" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#558b2f" />
                <stop offset="50%" stopColor="#437225" />
                <stop offset="100%" stopColor="#2e5119" />
              </radialGradient>
            </defs>

            {/* Ocean Base */}
            <rect width="1000" height="750" fill="url(#oceanGrad)" />

            {/* Shallow Coastal Turquoise Highlights */}
            <path
              d="M 120,180 Q 250,120 400,160 T 700,120 T 920,200 Q 940,380 820,440 T 750,620 Q 550,680 440,600 Q 280,560 200,480 T 120,180 Z"
              fill="none"
              stroke="#00ffff"
              strokeWidth="16"
              strokeOpacity="0.25"
              filter="url(#coastalGlow)"
            />

            {/* Main Landmass Continent */}
            <path
              d="M 140,200 C 180,140 300,130 420,170 C 520,130 650,110 750,140 C 880,180 910,280 880,360 C 840,430 890,520 820,590 C 740,650 560,660 450,590 C 360,620 250,560 210,480 C 160,420 110,320 140,200 Z"
              fill="url(#landGreen)"
              stroke="#2e5119"
              strokeWidth="4"
            />

            {/* Outlying Islands (Southern & Western Archipelago like attached map) */}
            <ellipse cx="220" cy="560" rx="35" ry="24" fill="#437225" stroke="#2e5119" strokeWidth="2" />
            <ellipse cx="320" cy="670" rx="42" ry="26" fill="#ca8a04" opacity="0.9" stroke="#854d0e" strokeWidth="2" />
            <ellipse cx="620" cy="680" rx="32" ry="16" fill="#437225" stroke="#2e5119" strokeWidth="2" />
            <ellipse cx="140" cy="400" rx="28" ry="18" fill="#437225" stroke="#2e5119" strokeWidth="2" />
            <ellipse cx="100" cy="240" rx="32" ry="22" fill="#437225" stroke="#2e5119" strokeWidth="2" />
            <ellipse cx="400" cy="100" rx="26" ry="16" fill="#437225" stroke="#2e5119" strokeWidth="2" />

            {/* Central Snow-Capped Holy Peaks (Grade 3 Domain) */}
            <g id="snowy-mountains" transform="translate(360, 240)">
              {/* Mountain Silhouettes */}
              <polygon points="120,40 180,170 60,170" fill="#334155" />
              <polygon points="120,40 180,170 120,170" fill="#1e293b" />
              <polygon points="70,70 120,170 20,170" fill="#475569" />
              <polygon points="160,80 220,170 110,170" fill="#334155" />
              {/* Snow Caps */}
              <polygon points="120,40 145,95 130,85 120,98 105,88 95,95" fill="url(#snowGrad)" />
              <polygon points="70,70 88,110 78,105 70,112 60,105" fill="url(#snowGrad)" />
              <polygon points="160,80 180,120 170,114 160,122 150,115" fill="url(#snowGrad)" />
              {/* Cloud wisps over peaks */}
              <path d="M 40,85 Q 90,65 140,85 Q 180,75 220,95" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
            </g>

            {/* Eastern Volcanic Crag Range & Glowing Lava Crater (Grade 5 Domain) */}
            <g id="volcano-zone" transform="translate(620, 310)">
              {/* Obsidian Mountain Jagged Peaks */}
              <polygon points="80,40 130,160 30,160" fill="#1c1917" />
              <polygon points="80,40 130,160 80,160" fill="#0c0a09" />
              <polygon points="140,60 190,160 90,160" fill="#1c1917" />
              <polygon points="30,80 70,160 -10,160" fill="#292524" />
              {/* Magma Caldera Crater */}
              <ellipse cx="80" cy="115" rx="34" ry="20" fill="url(#magmaGlow)" />
              <ellipse cx="80" cy="115" rx="20" ry="12" fill="#f97316" />
              <ellipse cx="80" cy="115" rx="10" ry="6" fill="#fef08a" />
              {/* Volcanic Smoke */}
              <circle cx="80" cy="70" r="16" fill="#44403c" opacity="0.4" />
              <circle cx="95" cy="50" r="22" fill="#292524" opacity="0.3" />
            </g>

            {/* Forest Clusters (Green plains & trees) */}
            <g id="forest-clusters" fill="#15803d" stroke="#14532d" strokeWidth="1">
              <circle cx="280" cy="460" r="12" />
              <circle cx="295" cy="450" r="14" />
              <circle cx="315" cy="465" r="13" />
              <circle cx="260" cy="475" r="15" />
              <circle cx="220" cy="360" r="14" />
              <circle cx="240" cy="350" r="16" />
              <circle cx="700" cy="220" r="14" />
              <circle cx="725" cy="210" r="16" />
              <circle cx="740" cy="230" r="13" />
            </g>

            {/* Lakes and Waterways */}
            <path
              d="M 680,240 Q 720,260 700,280 Q 660,280 680,240 Z"
              fill="#38bdf8"
              opacity="0.8"
            />
            <path
              d="M 580,250 Q 610,260 590,270 Z"
              fill="#38bdf8"
              opacity="0.8"
            />

            {/* Golden Adventure Path Connecting The Stages */}
            <path
              d="M 260,560 Q 200,470 260,380 T 440,320 T 580,220 T 680,280 T 740,430 T 520,130"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="5"
              strokeDasharray="10 8"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Bottom-Left Medieval Calligraphic "M" Emblem */}
            <g id="map-emblem" transform="translate(30, 610)">
              <text
                x="0"
                y="85"
                fontFamily="serif"
                fontSize="110"
                fontWeight="bold"
                fill="#d4af37"
                opacity="0.35"
                letterSpacing="-5"
              >
                M
              </text>
              <text
                x="18"
                y="90"
                fontFamily="serif"
                fontSize="65"
                fontWeight="bold"
                fill="#ffffff"
                opacity="0.25"
              >
                M
              </text>
            </g>

            {/* Bottom-Right Ornate Compass Rose */}
            <g id="compass-rose" transform="translate(880, 650)">
              {/* Outer Brass Ring */}
              <circle cx="0" cy="0" r="62" fill="#1e293b" stroke="#ca8a04" strokeWidth="4" />
              <circle cx="0" cy="0" r="54" fill="#0f172a" stroke="#ca8a04" strokeWidth="2" strokeDasharray="3 3" />
              
              {/* 8-pointed Star Points */}
              {/* North */}
              <polygon points="0,-52 8,-12 0,0" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
              <polygon points="0,-52 -8,-12 0,0" fill="#94a3b8" stroke="#ca8a04" strokeWidth="1" />
              {/* South */}
              <polygon points="0,52 8,12 0,0" fill="#94a3b8" stroke="#ca8a04" strokeWidth="1" />
              <polygon points="0,52 -8,12 0,0" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
              {/* East */}
              <polygon points="52,0 12,8 0,0" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
              <polygon points="52,0 12,-8 0,0" fill="#94a3b8" stroke="#ca8a04" strokeWidth="1" />
              {/* West */}
              <polygon points="-52,0 -12,-8 0,0" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
              <polygon points="-52,0 -12,8 0,0" fill="#94a3b8" stroke="#ca8a04" strokeWidth="1" />

              {/* Diagonal minor points */}
              <polygon points="36,-36 8,-8 0,0" fill="#d97706" />
              <polygon points="-36,-36 -8,-8 0,0" fill="#64748b" />
              <polygon points="36,36 8,8 0,0" fill="#64748b" />
              <polygon points="-36,36 -8,8 0,0" fill="#d97706" />

              {/* Center Pivot Gem */}
              <circle cx="0" cy="0" r="10" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
              <circle cx="0" cy="0" r="4" fill="#fef08a" />

              {/* Cardinal Labels */}
              <text x="-4" y="-38" fontSize="12" fontWeight="bold" fill="#ffffff" fontFamily="serif">N</text>
              <text x="-3" y="47" fontSize="11" fontWeight="bold" fill="#ffffff" fontFamily="serif">S</text>
              <text x="38" y="4" fontSize="11" fontWeight="bold" fill="#ffffff" fontFamily="serif">E</text>
              <text x="-46" y="4" fontSize="11" fontWeight="bold" fill="#ffffff" fontFamily="serif">W</text>
            </g>

            {/* Cloud Border Overlay (Edges framed in fluffy clouds like reference) */}
            <g id="cloud-borders" fill="#fde68a" opacity="0.6">
              {/* Top border clouds */}
              <path d="M 0,0 C 80,40 140,10 220,35 C 300,5 380,40 480,20 C 580,45 660,10 760,35 C 840,15 920,45 1000,0 L 1000,0 L 0,0 Z" />
              {/* Bottom border clouds */}
              <path d="M 0,750 C 70,720 150,740 230,715 C 310,745 420,710 520,735 C 620,710 740,745 840,720 C 920,740 970,720 1000,750 Z" />
              {/* Left border clouds */}
              <path d="M 0,0 C 35,90 10,180 30,280 C 10,380 40,480 20,580 C 40,680 10,720 0,750 Z" />
              {/* Right border clouds */}
              <path d="M 1000,0 C 965,90 990,180 970,280 C 990,380 960,480 980,580 C 960,680 990,720 1000,750 Z" />
            </g>
          </svg>

          {/* ================= MAP INTERACTIVE STAGE WAYPOINTS ================= */}
          <div className="relative w-full h-full min-h-[580px] sm:min-h-[660px] z-10 p-4">
            {filteredStages.map((stage) => {
              const isCurrent = activeStage.id === stage.id;
              const isCompleted = playerStats.completedStages.includes(stage.id);
              const stars = playerStats.stageStars[stage.id] || 0;

              return (
                <div
                  key={stage.id}
                  onClick={() => handleStageClick(stage)}
                  style={{
                    left: `${stage.mapPosition.x}%`,
                    top: `${stage.mapPosition.y}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 group z-20`}
                >
                  {/* Glowing Waypoint Base Pin */}
                  <div
                    className={`relative p-2.5 rounded-2xl border-2 flex items-center gap-2 shadow-2xl backdrop-blur-md transition-transform group-hover:scale-110 ${
                      stage.unlocked
                        ? isCurrent
                          ? 'bg-amber-500 text-slate-950 border-white ring-4 ring-amber-400/50 scale-110'
                          : isCompleted
                          ? 'bg-emerald-950/85 text-emerald-200 border-emerald-400'
                          : 'bg-slate-900/85 text-slate-100 border-amber-400/80 hover:border-amber-300'
                        : 'bg-slate-950/85 text-slate-500 border-slate-700 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {/* Monster Avatar Icon */}
                    <div className="w-8 h-8 rounded-xl bg-slate-950/50 flex items-center justify-center text-lg shrink-0 border border-white/20">
                      {stage.monster.avatar === 'slime' && '👾'}
                      {stage.monster.avatar === 'troll' && '👹'}
                      {stage.monster.avatar === 'golem' && '🗿'}
                      {stage.monster.avatar === 'sorcerer' && '🧙‍♂️'}
                      {stage.monster.avatar === 'kraken' && '🐙'}
                      {stage.monster.avatar === 'dragon' && '🐉'}
                      {stage.monster.avatar === 'chimera' && '🦁'}
                    </div>

                    {/* Stage Label Info */}
                    <div className="hidden sm:block text-left">
                      <div className="text-[10px] font-extrabold uppercase tracking-wide opacity-80">
                        {stage.grade}年級 · 第 {stage.stageNumber} 關
                      </div>
                      <div className="text-xs font-black leading-tight line-clamp-1">
                        {stage.name}
                      </div>
                      {/* Stars */}
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {[1, 2, 3].map((s) => (
                          <Star
                            key={s}
                            className={`w-2.5 h-2.5 ${
                              s <= stars ? 'fill-amber-300 text-amber-300' : 'fill-slate-700 text-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {!stage.unlocked && <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
                  </div>

                  {/* 3D Block Minifigure standing on active stage */}
                  {isCurrent && (
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 pointer-events-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] z-30">
                      <BlockCharacter
                        config={character}
                        actionState={isWalking ? 'walk' : 'idle'}
                        size="md"
                        direction="right"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Banner Info */}
          <div className="relative z-10 px-6 py-3 bg-slate-950/80 border-t border-[#b4884d]/50 flex items-center justify-between text-xs backdrop-blur">
            <div className="flex items-center gap-2 text-amber-300 font-semibold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>語文大冒險大陸：從翡翠平原出發，穿過白雪神山與成語浮島，直指萬卷博雅天閣！</span>
            </div>
            <div className="text-slate-400 text-[11px]">
              當前探索目標：<strong className="text-white">{activeStage.name}</strong>
            </div>
          </div>
        </div>
      </main>

      {/* Stage Entrance Dialog */}
      {showStageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 shadow-2xl text-slate-100 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-400">
                  {activeStage.grade}年級 · 第 {activeStage.stageNumber} 關
                </span>
                <h3 className="text-lg font-black text-white">{activeStage.name}</h3>
              </div>
              <button
                onClick={() => setShowStageModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {/* Target Monster Details */}
            <div className="flex items-center gap-4 p-3 bg-slate-950/70 rounded-2xl border border-slate-800">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl shrink-0">
                {activeStage.monster.avatar === 'slime' && '👾'}
                {activeStage.monster.avatar === 'troll' && '👹'}
                {activeStage.monster.avatar === 'golem' && '🗿'}
                {activeStage.monster.avatar === 'sorcerer' && '🧙‍♂️'}
                {activeStage.monster.avatar === 'kraken' && '🐙'}
                {activeStage.monster.avatar === 'dragon' && '🐉'}
                {activeStage.monster.avatar === 'chimera' && '🦁'}
              </div>
              <div className="space-y-0.5">
                <div className="font-extrabold text-sm text-white">
                  關卡怪獸：{activeStage.monster.name}
                </div>
                <div className="text-xs text-amber-300 font-medium">
                  {activeStage.monster.title}
                </div>
                <div className="text-xs text-slate-400">
                  弱點攻擊：{activeStage.monster.weakness}
                </div>
              </div>
            </div>

            {/* Key Curriculum Goals */}
            <div className="space-y-1.5 text-xs text-slate-300 bg-slate-800/40 p-3 rounded-xl border border-slate-800">
              <div className="font-bold text-slate-200">【本關語文挑戰要點】</div>
              <div>📖 課題：{activeStage.chapter}</div>
              <div>⚔️ 題型：閱讀理解、打亂重組句子、排句成段、成語法寶</div>
              <div>🏅 通關獎勵：冒險勳章、金幣獎勵 + 英雄升級 EXP</div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowStageModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors"
              >
                稍後再戰
              </button>
              <button
                onClick={() => {
                  setShowStageModal(false);
                  onEnterStage(activeStage);
                }}
                className="flex items-center gap-1.5 px-6 py-2.5 text-sm font-bold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 rounded-xl shadow-lg shadow-amber-500/25 active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>進入挑戰，迎擊怪獸！</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
