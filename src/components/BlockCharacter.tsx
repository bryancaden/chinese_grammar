import React from 'react';
import { CharacterConfig } from '../types/game';

interface BlockCharacterProps {
  config: CharacterConfig;
  actionState?: 'idle' | 'walk' | 'attack' | 'hurt' | 'victory';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  direction?: 'right' | 'left';
  showWeapon?: boolean;
}

export const BlockCharacter: React.FC<BlockCharacterProps> = ({
  config,
  actionState = 'idle',
  size = 'md',
  direction = 'right',
  showWeapon = true,
}) => {
  const scale = size === 'sm' ? 0.6 : size === 'md' ? 0.9 : size === 'lg' ? 1.2 : 1.5;

  // Hat rendering
  const renderHat = () => {
    switch (config.hatStyle) {
      case 'knight':
        return (
          <g transform="translate(0, -6)">
            {/* Knight Helmet Dome */}
            <path d="M 28 20 C 28 8 52 8 52 20 Z" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
            {/* Stud Top */}
            <rect x="36" y="8" width="8" height="4" rx="2" fill="#64748b" stroke="#334155" strokeWidth="1" />
            {/* Crest / Plume */}
            <path d="M 40 8 Q 42 -4 48 -2 Q 43 4 40 8 Z" fill="#ef4444" />
            {/* Visor Slit */}
            <rect x="30" y="20" width="20" height="5" rx="1.5" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
            <line x1="33" y1="22.5" x2="47" y2="22.5" stroke="#f8fafc" strokeWidth="1" />
          </g>
        );
      case 'scholar':
        return (
          <g transform="translate(0, -5)">
            {/* Scholar Cap / Square */}
            <polygon points="40,2 62,14 40,22 18,14" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
            <rect x="33" y="15" width="14" height="8" rx="2" fill="#334155" />
            {/* Tassel string & fringe */}
            <path d="M 40 12 C 48 12 55 18 57 26" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="57" cy="27" r="2" fill="#d97706" />
          </g>
        );
      case 'wizard':
        return (
          <g transform="translate(0, -12)">
            {/* Wizard Conical Hat */}
            <polygon points="40,2 54,26 26,26" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="2" />
            {/* Gold Star */}
            <text x="37" y="19" fontSize="9" fill="#fde047">★</text>
            <ellipse cx="40" cy="26" rx="18" ry="4" fill="#7c3aed" stroke="#5b21b6" strokeWidth="1.5" />
          </g>
        );
      case 'crown':
        return (
          <g transform="translate(0, -6)">
            {/* Golden Crown */}
            <polygon points="26,20 26,10 32,15 40,8 48,15 54,10 54,20" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
            <circle cx="32" cy="15" r="1.5" fill="#ef4444" />
            <circle cx="40" cy="8" r="1.5" fill="#3b82f6" />
            <circle cx="48" cy="15" r="1.5" fill="#10b981" />
          </g>
        );
      case 'cap':
      default:
        return (
          <g transform="translate(0, -4)">
            {/* Baseball cap */}
            <path d="M 28 20 C 28 11 52 11 52 20 Z" fill={config.hairColor} stroke="#0f172a" strokeWidth="1.5" />
            {/* Brim visor */}
            <path d="M 42 19 L 59 19 Q 54 22 46 22 Z" fill={config.hairColor} stroke="#0f172a" strokeWidth="1.5" />
            {/* Cap button */}
            <circle cx="40" cy="11" r="2" fill="#ffffff" />
          </g>
        );
    }
  };

  // Weapon Rendering
  const renderWeapon = () => {
    if (!showWeapon) return null;
    switch (config.weaponStyle) {
      case 'pencil_wand':
        return (
          <g transform="translate(56, 32) rotate(25)">
            {/* Giant Yellow Educational Pencil Wand */}
            <rect x="0" y="0" width="8" height="34" rx="1" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
            {/* Ferrule (metal band) */}
            <rect x="0" y="24" width="8" height="5" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
            {/* Pink Eraser */}
            <rect x="0" y="29" width="8" height="6" rx="2" fill="#f43f5e" stroke="#be123c" strokeWidth="1" />
            {/* Sharpened wood tip & graphite */}
            <polygon points="0,0 8,0 4,-9" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
            <polygon points="2,-5 6,-5 4,-9" fill="#1e293b" />
            {/* Magic sparkles */}
            <circle cx="4" cy="-12" r="2" fill="#38bdf8" className="animate-ping" />
          </g>
        );
      case 'hammer':
        return (
          <g transform="translate(56, 32) rotate(35)">
            {/* Brick Hammer shaft */}
            <rect x="2" y="0" width="5" height="30" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
            {/* Heavy Brick Block Head */}
            <rect x="-8" y="-12" width="25" height="14" rx="2" fill="#e11d48" stroke="#9f1239" strokeWidth="2" />
            {/* 2 LEGO studs on hammer */}
            <circle cx="-2" cy="-14" r="2.5" fill="#f43f5e" stroke="#9f1239" strokeWidth="1" />
            <circle cx="10" cy="-14" r="2.5" fill="#f43f5e" stroke="#9f1239" strokeWidth="1" />
          </g>
        );
      case 'book_shield':
        return (
          <g transform="translate(56, 32) rotate(15)">
            {/* Tome of Knowledge / Chinese Lexicon */}
            <rect x="0" y="0" width="22" height="28" rx="2" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
            <rect x="3" y="3" width="16" height="22" rx="1" fill="#f8fafc" />
            <text x="7" y="17" fontSize="11" fontWeight="bold" fill="#0369a1">國</text>
            <text x="7" y="24" fontSize="7" fontWeight="bold" fill="#0369a1">文</text>
          </g>
        );
      case 'sword':
      default:
        return (
          <g transform="translate(56, 30) rotate(20)">
            {/* Lego Golden Pixel Blade */}
            <rect x="1" y="-20" width="6" height="24" rx="1.5" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
            {/* Sword tip */}
            <polygon points="1,-20 7,-20 4,-26" fill="#7dd3fc" stroke="#0284c7" strokeWidth="1.5" />
            {/* Crossguard */}
            <rect x="-4" y="4" width="16" height="4" rx="1.5" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
            {/* Handle */}
            <rect x="2" y="8" width="4" height="10" fill="#92400e" stroke="#78350f" strokeWidth="1" />
            {/* Pommel */}
            <circle cx="4" cy="20" r="3" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
          </g>
        );
    }
  };

  // Expression by state
  const isHurt = actionState === 'hurt';
  const isVictory = actionState === 'victory';
  const isAttacking = actionState === 'attack';
  const isWalking = actionState === 'walk';

  return (
    <div
      className={`inline-block relative transition-transform duration-200 ${
        direction === 'left' ? '-scale-x-100' : 'scale-x-100'
      } ${isHurt ? 'animate-shake-hurt' : ''} ${isAttacking ? 'animate-hero-attack' : ''} ${
        isVictory ? 'animate-bounce' : ''
      } ${isWalking ? 'animate-hero-walk' : ''}`}
      style={{
        width: `${80 * scale}px`,
        height: `${110 * scale}px`,
      }}
    >
      <svg
        viewBox="0 0 80 110"
        className="w-full h-full drop-shadow-[0_8px_12px_rgba(0,0,0,0.4)]"
      >
        <defs>
          <linearGradient id="studGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
          </linearGradient>
          <filter id="legoShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* --- LEGS & FEET (LEGO DUAL LEGS) --- */}
        <g id="legs" className={isWalking ? 'origin-top animate-leg-swing' : ''}>
          {/* Hips block */}
          <rect x="26" y="74" width="28" height="8" rx="2" fill={config.pantsColor} stroke="#0f172a" strokeWidth="1.5" />
          {/* Left Leg */}
          <g>
            <rect x="26" y="82" width="13" height="22" rx="2" fill={config.pantsColor} stroke="#0f172a" strokeWidth="1.5" />
            {/* Left Foot */}
            <rect x="24" y="98" width="15" height="8" rx="2.5" fill={config.pantsColor} stroke="#0f172a" strokeWidth="1.5" />
            {/* Foot sole rim */}
            <line x1="25" y1="104" x2="38" y2="104" stroke="#000000" strokeWidth="1" strokeOpacity="0.3" />
          </g>
          {/* Right Leg */}
          <g>
            <rect x="41" y="82" width="13" height="22" rx="2" fill={config.pantsColor} stroke="#0f172a" strokeWidth="1.5" />
            {/* Right Foot */}
            <rect x="41" y="98" width="15" height="8" rx="2.5" fill={config.pantsColor} stroke="#0f172a" strokeWidth="1.5" />
            {/* Foot sole rim */}
            <line x1="42" y1="104" x2="55" y2="104" stroke="#000000" strokeWidth="1" strokeOpacity="0.3" />
          </g>
        </g>

        {/* --- TORSO & ARMS --- */}
        <g id="torso-group" className={isAttacking ? 'origin-bottom animate-torso-lunge' : ''}>
          {/* Torso (Trapezoidal Lego block) */}
          <path
            d="M 28 42 L 52 42 L 56 74 L 24 74 Z"
            fill={isHurt ? '#ef4444' : config.shirtColor}
            stroke="#0f172a"
            strokeWidth="2"
          />

          {/* Shirt Details / Collar / Pocket */}
          <polygon points="36,42 44,42 40,49" fill="#f8fafc" stroke="#0f172a" strokeWidth="1" />
          {/* Tie or Chinese scroll symbol on chest */}
          <rect x="38.5" y="49" width="3" height="15" fill="#f59e0b" stroke="#b45309" strokeWidth="0.8" rx="1" />
          <circle cx="40" cy="54" r="1" fill="#ffffff" />
          <circle cx="40" cy="59" r="1" fill="#ffffff" />

          {/* Left Arm (behind/neutral) */}
          <g id="left-arm">
            <path
              d="M 27 44 Q 18 56 22 68"
              fill="none"
              stroke={config.shirtColor}
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* Left C-Hand */}
            <path
              d="M 20 67 C 16 67 15 75 22 75 C 24 75 24 73 22 72"
              fill="none"
              stroke={config.skinTone}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>

          {/* Right Arm & Weapon (Foreground) */}
          <g id="right-arm" className={isAttacking ? 'origin-top-left animate-arm-slash' : ''}>
            <path
              d="M 53 44 Q 62 56 58 68"
              fill="none"
              stroke={config.shirtColor}
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* Right C-Hand */}
            <path
              d="M 58 67 C 62 67 63 75 56 75 C 54 75 54 73 56 72"
              fill="none"
              stroke={config.skinTone}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Equipped Weapon attached to hand */}
            {renderWeapon()}
          </g>
        </g>

        {/* --- HEAD & NECK --- */}
        <g id="head-group">
          {/* Neck cylinder */}
          <rect x="36" y="38" width="8" height="5" rx="1.5" fill={config.skinTone} stroke="#0f172a" strokeWidth="1.2" />

          {/* Head Stud (Lego Top Stud) */}
          <rect x="35" y="14" width="10" height="5" rx="2" fill={config.skinTone} stroke="#0f172a" strokeWidth="1.5" />
          <rect x="35" y="14" width="10" height="5" rx="2" fill="url(#studGrad)" />

          {/* Cylindrical Yellow Head Block */}
          <rect
            x="27"
            y="18"
            width="26"
            height="22"
            rx="5"
            fill={config.skinTone}
            stroke="#0f172a"
            strokeWidth="1.8"
          />

          {/* Face Elements */}
          {isHurt ? (
            // Dizzy / Hurt eyes
            <g stroke="#0f172a" strokeWidth="2" strokeLinecap="round">
              <line x1="33" y1="26" x2="39" y2="30" />
              <line x1="39" y1="26" x2="33" y2="30" />
              <line x1="43" y1="26" x2="49" y2="30" />
              <line x1="49" y1="26" x2="43" y2="30" />
              {/* Wavy sad mouth */}
              <path d="M 36 36 Q 40 33 44 36" fill="none" strokeWidth="2" />
            </g>
          ) : isVictory ? (
            // Joyful happy closed crescent eyes
            <g stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round">
              <path d="M 33 28 Q 36 24 39 28" />
              <path d="M 43 28 Q 46 24 49 28" />
              {/* Wide open happy smile with tongue */}
              <path d="M 35 32 Q 40 40 46 32 Z" fill="#ef4444" stroke="#0f172a" strokeWidth="1.5" />
              {/* Rosy cheeks */}
              <circle cx="32" cy="32" r="2.5" fill="#f43f5e" opacity="0.6" />
              <circle cx="48" cy="32" r="2.5" fill="#f43f5e" opacity="0.6" />
            </g>
          ) : (
            // Determined cute classic Lego smile
            <g>
              {/* Left Eye with glint */}
              <ellipse cx="35" cy="27" rx="2" ry="2.5" fill="#0f172a" />
              <circle cx="34.2" cy="26" r="0.8" fill="#ffffff" />
              {/* Right Eye with glint */}
              <ellipse cx="46" cy="27" rx="2" ry="2.5" fill="#0f172a" />
              <circle cx="45.2" cy="26" r="0.8" fill="#ffffff" />
              {/* Cute curved smile */}
              <path d="M 37 34 Q 40 37 44 34" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
              {/* Cheerful blush */}
              <circle cx="32" cy="31" r="2" fill="#fb7185" opacity="0.4" />
              <circle cx="49" cy="31" r="2" fill="#fb7185" opacity="0.4" />
            </g>
          )}

          {/* Equipped Hat/Helmet */}
          {renderHat()}
        </g>
      </svg>
    </div>
  );
};
