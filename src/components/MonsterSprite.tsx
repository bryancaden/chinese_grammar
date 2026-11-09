import React from 'react';
import { Monster } from '../types/game';

interface MonsterSpriteProps {
  monster: Monster;
  actionState?: 'idle' | 'attack' | 'hurt' | 'defeated';
  size?: 'md' | 'lg' | 'xl';
}

export const MonsterSprite: React.FC<MonsterSpriteProps> = ({
  monster,
  actionState = 'idle',
  size = 'lg',
}) => {
  const scale = size === 'md' ? 0.9 : size === 'lg' ? 1.25 : 1.5;

  const isHurt = actionState === 'hurt';
  const isAttacking = actionState === 'attack';
  const isDefeated = actionState === 'defeated';

  const renderMonsterSvg = () => {
    switch (monster.avatar) {
      case 'slime':
        return (
          <g>
            {/* Gooey Slime Body */}
            <path
              d="M 25 70 C 10 70 8 50 18 36 C 26 24 45 15 55 20 C 70 24 75 42 72 58 C 70 70 55 74 25 70 Z"
              fill={isHurt ? '#ef4444' : monster.themeColor}
              stroke="#0f172a"
              strokeWidth="2.5"
            />
            {/* Slime Gloss Highlights */}
            <ellipse cx="38" cy="30" rx="10" ry="5" fill="#ffffff" opacity="0.3" transform="rotate(-15 38 30)" />
            {/* Eyes */}
            <circle cx="34" cy="42" r="5" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
            <circle cx="35" cy="42" r="2.5" fill="#0f172a" />
            <circle cx="50" cy="40" r="6" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
            <circle cx="51" cy="40" r="3" fill="#0f172a" />
            {/* Ink droplets on head */}
            <circle cx="58" cy="18" r="4" fill={monster.themeColor} stroke="#0f172a" strokeWidth="1.5" />
            <circle cx="64" cy="12" r="2.5" fill={monster.themeColor} />
            {/* Mouth */}
            <path d="M 38 52 Q 44 58 50 51" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          </g>
        );

      case 'troll':
        return (
          <g>
            {/* Horns */}
            <polygon points="26,24 16,10 32,18" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
            <polygon points="54,24 64,10 48,18" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
            {/* Troll Head & Body */}
            <rect x="22" y="22" width="36" height="38" rx="8" fill={isHurt ? '#ef4444' : monster.themeColor} stroke="#0f172a" strokeWidth="2.5" />
            {/* Grumpy Brows */}
            <line x1="28" y1="32" x2="38" y2="36" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            <line x1="52" y1="32" x2="42" y2="36" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            {/* Eyes */}
            <circle cx="33" cy="40" r="3" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
            <circle cx="34" cy="40" r="1.5" fill="#ef4444" />
            <circle cx="47" cy="40" r="3" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
            <circle cx="46" cy="40" r="1.5" fill="#ef4444" />
            {/* Fangs */}
            <polygon points="32,54 36,46 40,54" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
            <polygon points="40,54 44,46 48,54" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
            {/* Little Block Feet */}
            <rect x="24" y="60" width="12" height="12" rx="3" fill="#78350f" stroke="#0f172a" strokeWidth="1.5" />
            <rect x="44" y="60" width="12" height="12" rx="3" fill="#78350f" stroke="#0f172a" strokeWidth="1.5" />
          </g>
        );

      case 'golem':
        return (
          <g>
            {/* Stone Golem Head & Shoulders */}
            <rect x="18" y="24" width="44" height="36" rx="4" fill={isHurt ? '#ef4444' : '#64748b'} stroke="#1e293b" strokeWidth="2.5" />
            {/* Crystal Core (Eye) */}
            <polygon points="40,32 48,42 40,52 32,42" fill="#818cf8" stroke="#4338ca" strokeWidth="2" />
            <circle cx="40" cy="42" r="3" fill="#e0e7ff" />
            {/* Cracks in Stone */}
            <path d="M 24 30 L 30 36 L 27 46" fill="none" stroke="#334155" strokeWidth="1.5" />
            <path d="M 54 48 L 50 54 L 56 58" fill="none" stroke="#334155" strokeWidth="1.5" />
            {/* Heavy Boulder Hands */}
            <circle cx="12" cy="48" r="10" fill="#475569" stroke="#1e293b" strokeWidth="2" />
            <circle cx="68" cy="48" r="10" fill="#475569" stroke="#1e293b" strokeWidth="2" />
            <rect x="26" y="60" width="12" height="14" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
            <rect x="42" y="60" width="12" height="14" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
          </g>
        );

      case 'kraken':
        return (
          <g>
            {/* Punctuation Octopus Head */}
            <circle cx="40" cy="35" r="22" fill={isHurt ? '#ef4444' : monster.themeColor} stroke="#0f172a" strokeWidth="2.5" />
            {/* Tentacles */}
            <path d="M 22 50 Q 10 65 18 78 Q 24 70 26 54" fill={monster.themeColor} stroke="#0f172a" strokeWidth="1.5" />
            <path d="M 32 54 Q 28 72 35 84 Q 38 72 36 54" fill={monster.themeColor} stroke="#0f172a" strokeWidth="1.5" />
            <path d="M 44 54 Q 48 72 52 84 Q 50 70 48 54" fill={monster.themeColor} stroke="#0f172a" strokeWidth="1.5" />
            <path d="M 54 50 Q 68 65 62 78 Q 58 70 54 54" fill={monster.themeColor} stroke="#0f172a" strokeWidth="1.5" />
            {/* Big Expressive Eyes */}
            <ellipse cx="32" cy="34" rx="5" ry="6" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
            <circle cx="34" cy="34" r="3" fill="#0284c7" />
            <ellipse cx="48" cy="34" rx="5" ry="6" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
            <circle cx="46" cy="34" r="3" fill="#0284c7" />
            {/* Punctuation floating marks on tentacles */}
            <text x="12" y="75" fontSize="12" fontWeight="bold" fill="#facc15">？</text>
            <text x="60" y="75" fontSize="12" fontWeight="bold" fill="#facc15">！</text>
            <text x="35" y="24" fontSize="11" fontWeight="bold" fill="#ffffff">「」</text>
          </g>
        );

      case 'dragon':
        return (
          <g>
            {/* Dragon Horns & Spikes */}
            <polygon points="34,16 38,2 44,14" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
            <polygon points="46,16 54,4 52,16" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
            {/* Dragon Snout & Head */}
            <path d="M 24 38 Q 12 42 16 54 Q 32 56 42 50 L 52 46 Q 58 32 46 22 Q 32 20 24 38 Z" fill={isHurt ? '#ef4444' : '#dc2626'} stroke="#7f1d1d" strokeWidth="2.5" />
            {/* Flaming Eye */}
            <circle cx="34" cy="32" r="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
            <polygon points="33,32 35,29 35,35" fill="#0f172a" />
            {/* Dragon Wings */}
            <path d="M 48 30 Q 72 16 76 32 Q 62 44 48 38 Z" fill="#991b1b" stroke="#450a0a" strokeWidth="2" />
            {/* Smoke / Fire breathing from snout */}
            <ellipse cx="10" cy="52" rx="6" ry="3" fill="#fb923c" opacity="0.8" className="animate-pulse" />
            <ellipse cx="4" cy="53" rx="4" ry="2" fill="#ef4444" opacity="0.7" />
          </g>
        );

      case 'chimera':
      default:
        return (
          <g>
            {/* Golden Lion Chimera Mane */}
            <circle cx="40" cy="40" r="26" fill="#f59e0b" stroke="#b45309" strokeWidth="3" />
            {/* Mane Spikes */}
            <polygon points="40,8 45,18 35,18" fill="#d97706" />
            <polygon points="64,24 55,29 60,36" fill="#d97706" />
            <polygon points="68,48 57,48 62,56" fill="#d97706" />
            <polygon points="16,24 25,29 20,36" fill="#d97706" />
            <polygon points="12,48 23,48 18,56" fill="#d97706" />
            {/* Face */}
            <circle cx="40" cy="40" r="18" fill={isHurt ? '#ef4444' : '#fef08a'} stroke="#0f172a" strokeWidth="2" />
            {/* Crown of Wisdom */}
            <polygon points="32,22 36,14 40,18 44,14 48,22" fill="#facc15" stroke="#854d0e" strokeWidth="1.5" />
            {/* Fierce Eyes */}
            <polygon points="30,34 38,36 34,40" fill="#0f172a" />
            <polygon points="50,34 42,36 46,40" fill="#0f172a" />
            {/* Lion Nose & Whiskers */}
            <polygon points="38,44 42,44 40,47" fill="#dc2626" />
            <path d="M 38 48 Q 40 52 42 48" fill="none" stroke="#0f172a" strokeWidth="1.5" />
          </g>
        );
    }
  };

  return (
    <div
      className={`inline-block relative transition-all duration-200 ${
        isHurt ? 'animate-shake-hurt scale-95 brightness-125' : ''
      } ${isAttacking ? 'animate-monster-lunge' : ''} ${
        isDefeated ? 'scale-0 opacity-0 rotate-45 transition-all duration-700' : 'animate-float-slow'
      }`}
      style={{
        width: `${80 * scale}px`,
        height: `${90 * scale}px`,
      }}
    >
      <svg
        viewBox="0 0 80 90"
        className="w-full h-full drop-shadow-[0_10px_16px_rgba(0,0,0,0.5)]"
      >
        {renderMonsterSvg()}
      </svg>
    </div>
  );
};
