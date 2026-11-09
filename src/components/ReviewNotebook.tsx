import React, { useState } from 'react';
import { Question } from '../types/game';
import { BookOpen, CheckCircle, RotateCcw, X, Sparkles, Volume2 } from 'lucide-react';
import { sound } from '../utils/sound';

interface ReviewNotebookProps {
  wrongQuestions: { question: Question; failedCount: number; lastFailedAt: number }[];
  onRemoveQuestion: (questionId: string) => void;
  onClose: () => void;
}

export const ReviewNotebook: React.FC<ReviewNotebookProps> = ({
  wrongQuestions,
  onRemoveQuestion,
  onClose,
}) => {
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(
    wrongQuestions[0]?.question || null
  );
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isResolved, setIsResolved] = useState<boolean>(false);
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);

  const handleTestOption = (label: string) => {
    if (!activeQuestion) return;
    sound.playClick();
    setSelectedOption(label);
    if (label === activeQuestion.correctOption) {
      sound.playCorrect();
      setIsResolved(true);
      setStatusFeedback('🎉 太棒了！這次完全掌握了，已成功攻克此錯題！');
      setTimeout(() => {
        onRemoveQuestion(activeQuestion.id);
        setIsResolved(false);
        setSelectedOption(null);
        setStatusFeedback(null);
      }, 1500);
    } else {
      sound.playWrong();
      setStatusFeedback('❌ 還是不太對喔！請參考下方老師的小錦囊再想一想。');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border-2 border-sky-500/40 rounded-3xl p-6 shadow-2xl text-slate-100 flex flex-col max-h-[88vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-2xl shadow-inner">
              📖
            </div>
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <span>溫故知新 · 錯題筆記本</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40">
                  {wrongQuestions.length} 道待複習
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                將曾經失分的題目再次重練，掌握核心解題策略，化短板為強項！
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

        {wrongQuestions.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-3xl mb-3">
              🌟
            </div>
            <h3 className="text-base font-bold text-white mb-1">太厲害了！目前沒有任何錯題</h3>
            <p className="text-xs text-slate-400 max-w-sm">
              你在闖關冒險中展現了超凡的語文功底，繼續挑戰更多關卡吧！
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {/* Left: List of wrong questions */}
            <div className="space-y-2 overflow-y-auto max-h-[50vh] pr-1">
              {wrongQuestions.map(({ question, failedCount }) => (
                <button
                  key={question.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveQuestion(question);
                    setSelectedOption(null);
                    setStatusFeedback(null);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs ${
                    activeQuestion?.id === question.id
                      ? 'bg-sky-950/60 border-sky-400 text-sky-100 shadow'
                      : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-amber-400">
                      {question.grade}年級 · {question.category}
                    </span>
                    <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.2 rounded border border-rose-500/30">
                      失誤 {failedCount} 次
                    </span>
                  </div>
                  <div className="font-semibold text-white line-clamp-1">{question.title}</div>
                </button>
              ))}
            </div>

            {/* Right: Active question solver & explanation */}
            <div className="md:col-span-2 bg-slate-950/60 border border-slate-800 rounded-2xl p-4 overflow-y-auto max-h-[55vh] flex flex-col justify-between">
              {activeQuestion && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-sky-400">
                      {activeQuestion.instruction}
                    </span>
                    <button
                      onClick={() => sound.speakText(activeQuestion.prompt)}
                      className="text-slate-400 hover:text-sky-300 p-1"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="text-sm font-bold text-white leading-relaxed">
                    {activeQuestion.prompt}
                  </h4>

                  {/* Options */}
                  {activeQuestion.options && (
                    <div className="space-y-2">
                      {activeQuestion.options.map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() => handleTestOption(opt.label)}
                          className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl border text-left text-xs transition-all ${
                            selectedOption === opt.label
                              ? opt.label === activeQuestion.correctOption
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-100'
                                : 'bg-rose-950/80 border-rose-500 text-rose-100'
                              : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-200'
                          }`}
                        >
                          <span className="w-5 h-5 rounded bg-slate-700 flex items-center justify-center font-bold shrink-0">
                            {opt.label}
                          </span>
                          <span>{opt.text}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Feedback Status */}
                  {statusFeedback && (
                    <div className="p-2.5 bg-slate-900 border border-sky-500/30 rounded-xl text-xs font-medium text-sky-200">
                      {statusFeedback}
                    </div>
                  )}

                  {/* Teacher Explanation Card */}
                  <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl space-y-1.5 text-xs">
                    <div className="font-bold text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{activeQuestion.explanation.teacherSummary}</span>
                    </div>
                    <div className="text-slate-300">
                      <strong className="text-sky-300">核心策略：</strong>
                      {activeQuestion.explanation.keyStrategy}
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      {activeQuestion.explanation.detailedReason}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

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
