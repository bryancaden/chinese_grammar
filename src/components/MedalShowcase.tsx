import React from 'react';
import { Medal } from '../types/game';
import { Award, CheckCircle, Lock, X } from 'lucide-react';
import { sound } from '../utils/sound';

interface MedalShowcaseProps {
  medals: Medal[];
  unlockedMedalIds: string[];
  onClose: () => void;
}

export const MedalShowcase: React.FC<MedalShowcaseProps> = ({
  medals,
  unlockedMedalIds,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl text-slate-100 flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shadow-inner">
              🏅
            </div>
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <span>冒險勳章榮譽館</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                  {unlockedMedalIds.length} / {medals.length} 已解鎖
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                答對各年級關卡問題並擊敗守護怪獸，贏取至高無上的語文勳章！
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Medal Grid */}
        <div className="flex-1 overflow-y-auto py-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pr-1">
          {medals.map((medal) => {
            const isUnlocked = unlockedMedalIds.includes(medal.id);
            return (
              <div
                key={medal.id}
                onClick={() => sound.playClick()}
                className={`p-4 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-slate-800/80 border-amber-500/40 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-950/40 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 border ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-amber-400/20 to-amber-600/30 border-amber-400/60 shadow'
                        : 'bg-slate-900 border-slate-800 grayscale'
                    }`}
                  >
                    {medal.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400">
                        {medal.grade}年級 · {medal.category}
                      </span>
                      {isUnlocked ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Lock className="w-4 h-4 text-slate-600" />
                      )}
                    </div>
                    <h3 className="font-extrabold text-sm text-white mt-0.5">{medal.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {medal.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};
