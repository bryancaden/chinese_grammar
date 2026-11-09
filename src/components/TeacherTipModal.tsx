import React from 'react';
import { Question } from '../types/game';
import { sound } from '../utils/sound';
import { X, Sparkles, AlertCircle, BookOpen, Volume2, ShieldAlert } from 'lucide-react';

interface TeacherTipModalProps {
  question: Question;
  isWrongAnswerExplanation?: boolean;
  onClose: () => void;
  onRetry?: () => void;
}

export const TeacherTipModal: React.FC<TeacherTipModalProps> = ({
  question,
  isWrongAnswerExplanation = false,
  onClose,
  onRetry,
}) => {
  const handleSpeak = () => {
    sound.speakText(
      `${question.explanation.teacherSummary}。解題重點是：${question.explanation.keyStrategy}。詳細說明：${question.explanation.detailedReason}`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl p-6 text-slate-100 flex flex-col max-h-[90vh] overflow-y-auto">
        {/* Header with Teacher Icon */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shadow-inner">
              👩‍🏫
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-400 text-base">陳老師 · 資深語文名師小錦囊</span>
                {isWrongAnswerExplanation && (
                  <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-medium">
                    怪獸反擊！吸收經驗重來
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">國小語文課綱 · {question.grade}年級核心素養指導（標準女聲朗讀）</p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.stopSpeaking();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-4 space-y-4 text-sm">
          {/* Audio Speech Button */}
          <div className="flex items-center justify-between p-3 bg-amber-950/30 border border-amber-500/20 rounded-xl">
            <div className="flex items-center gap-2 text-amber-300 font-medium text-xs">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>聽聽老師用親切語音為你解說：</span>
            </div>
            <button
              onClick={handleSpeak}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-amber-500 text-slate-950 rounded-lg hover:bg-amber-400 active:scale-95 transition-all shadow"
            >
              <Volume2 className="w-3.5 h-3.5" />
              朗讀解析
            </button>
          </div>

          {/* Teacher Summary Quote */}
          <div className="p-3.5 bg-slate-800/80 border-l-4 border-amber-400 rounded-r-xl">
            <p className="text-amber-200 font-medium leading-relaxed">
              {question.explanation.teacherSummary}
            </p>
          </div>

          {/* Key Strategy */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
              <BookOpen className="w-4 h-4" />
              <span>【必備解題法寶 & 策略】</span>
            </div>
            <div className="p-3 bg-slate-800/50 border border-slate-700/60 rounded-xl text-slate-300">
              <span className="font-semibold text-sky-300">{question.explanation.keyStrategy}</span>
            </div>
          </div>

          {/* Detailed Reason / Common Trap */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-400">
              <AlertCircle className="w-4 h-4" />
              <span>【常犯錯陷阱 & 詳細剖析】</span>
            </div>
            <div className="p-3.5 bg-slate-800/60 border border-slate-700/60 rounded-xl text-slate-200 leading-relaxed text-xs">
              {question.explanation.detailedReason}
            </div>
          </div>

          {/* Pedagogy Note from Textbooks */}
          <div className="flex items-start gap-2 text-xs text-slate-400 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
            <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              語文小叮嚀：答錯不可怕，每一道錯題都是積木搭建更高城堡的基石。仔細看清題意，下一次出手必能命中怪獸弱點！
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={() => {
              sound.stopSpeaking();
              onClose();
            }}
            className="px-4 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
          >
            明白了，關閉
          </button>
          {onRetry && (
            <button
              onClick={() => {
                sound.stopSpeaking();
                onRetry();
              }}
              className="px-5 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-95 rounded-xl transition-all shadow-lg shadow-amber-500/20"
            >
              再戰一次！消滅怪獸 🔥
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
