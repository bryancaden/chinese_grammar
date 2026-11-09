import React from 'react';
import { CharacterConfig } from '../types/game';
import { BlockCharacter } from './BlockCharacter';
import { sound } from '../utils/sound';
import { X, Sparkles, Check } from 'lucide-react';

interface CharacterCustomizerProps {
  config: CharacterConfig;
  onSave: (config: CharacterConfig) => void;
  onClose: () => void;
}

const HATS: { id: CharacterConfig['hatStyle']; name: string; emoji: string }[] = [
  { id: 'knight', name: '英勇騎士盔', emoji: '⚔️' },
  { id: 'scholar', name: '狀元四方帽', emoji: '🎓' },
  { id: 'wizard', name: '星光法師帽', emoji: '🧙‍♂️' },
  { id: 'crown', name: '榮耀金王冠', emoji: '👑' },
  { id: 'cap', name: '探險運動帽', emoji: '🧢' },
];

const WEAPONS: { id: CharacterConfig['weaponStyle']; name: string; emoji: string }[] = [
  { id: 'sword', name: '雷射語文聖劍', emoji: '🗡️' },
  { id: 'pencil_wand', name: '黃金神筆法杖', emoji: '✏️' },
  { id: 'hammer', name: '積木重組巨槌', emoji: '🔨' },
  { id: 'book_shield', name: '國文典籍神盾', emoji: '🛡️' },
];

const SHIRT_COLORS = [
  { label: '熱情紅', hex: '#ef4444' },
  { label: '深空藍', hex: '#0284c7' },
  { label: '翡翠綠', hex: '#10b981' },
  { label: '魔法紫', hex: '#8b5cf6' },
  { label: '耀眼黃', hex: '#f59e0b' },
  { label: '玄鐵黑', hex: '#334155' },
];

const PANTS_COLORS = [
  { label: '牛仔藍', hex: '#1e3a8a' },
  { label: '碳黑褲', hex: '#1e293b' },
  { label: '沙色長褲', hex: '#d97706' },
  { label: '白玉褲', hex: '#e2e8f0' },
  { label: '烈火褲', hex: '#991b1b' },
];

export const CharacterCustomizer: React.FC<CharacterCustomizerProps> = ({
  config,
  onSave,
  onClose,
}) => {
  const [currentConfig, setCurrentConfig] = React.useState<CharacterConfig>({ ...config });

  const handleUpdate = (updates: Partial<CharacterConfig>) => {
    sound.playClick();
    setCurrentConfig((prev) => ({ ...prev, ...updates }));
  };

  const handleSave = () => {
    sound.playVictory();
    onSave(currentConfig);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border-2 border-purple-500/40 rounded-3xl p-6 shadow-2xl text-slate-100 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-xl shadow-inner">
              🎨
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">積木小人 · 換裝工坊</h2>
              <p className="text-xs text-slate-400">自訂你的專屬語文小英雄外觀與武器！</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Preview Area */}
        <div className="py-4 flex flex-col sm:flex-row items-center justify-center gap-6 bg-slate-950/50 rounded-2xl border border-slate-800 my-2 p-4">
          <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 shadow-inner flex flex-col items-center">
            <BlockCharacter
              config={currentConfig}
              actionState="idle"
              size="xl"
              direction="right"
            />
            <div className="mt-2 text-xs font-bold text-amber-400">
              {currentConfig.name}
            </div>
          </div>

          {/* Name input */}
          <div className="flex-1 w-full space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">英雄名號：</label>
              <input
                type="text"
                value={currentConfig.name}
                maxLength={8}
                onChange={(e) => setCurrentConfig({ ...currentConfig, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Hat Selection */}
            <div>
              <label className="font-semibold text-slate-300 block mb-1">帽子與頭飾：</label>
              <div className="grid grid-cols-3 gap-1.5">
                {HATS.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => handleUpdate({ hatStyle: h.id })}
                    className={`p-1.5 rounded-lg border text-center font-medium transition-all ${
                      currentConfig.hatStyle === h.id
                        ? 'bg-purple-950/60 border-purple-400 text-purple-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{h.emoji}</span>
                    <span className="block text-[10px] mt-0.5">{h.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Weapon Selection */}
            <div>
              <label className="font-semibold text-slate-300 block mb-1">冒險武器：</label>
              <div className="grid grid-cols-2 gap-1.5">
                {WEAPONS.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => handleUpdate({ weaponStyle: w.id })}
                    className={`p-1.5 rounded-lg border flex items-center gap-1.5 font-medium transition-all ${
                      currentConfig.weaponStyle === w.id
                        ? 'bg-amber-950/60 border-amber-400 text-amber-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{w.emoji}</span>
                    <span className="text-[10px]">{w.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Color Palette Choices */}
        <div className="space-y-2 py-1 text-xs">
          {/* Shirt Colors */}
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-semibold w-16">戰衣顏色:</span>
            <div className="flex items-center gap-2 flex-wrap">
              {SHIRT_COLORS.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => handleUpdate({ shirtColor: c.hex })}
                  className={`w-7 h-7 rounded-full border-2 transition-transform ${
                    currentConfig.shirtColor === c.hex ? 'scale-115 border-white' : 'border-slate-800'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          {/* Pants Colors */}
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-semibold w-16">長褲顏色:</span>
            <div className="flex items-center gap-2 flex-wrap">
              {PANTS_COLORS.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => handleUpdate({ pantsColor: c.hex })}
                  className={`w-7 h-7 rounded-full border-2 transition-transform ${
                    currentConfig.pantsColor === c.hex ? 'scale-115 border-white' : 'border-slate-800'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.label}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-lg shadow-purple-600/25 active:scale-95 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>儲存外觀</span>
          </button>
        </div>
      </div>
    </div>
  );
};
