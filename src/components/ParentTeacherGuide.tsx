import React, { useState } from 'react';
import { BookOpen, CheckCircle, GraduationCap, X, Sparkles, Lightbulb } from 'lucide-react';
import { sound } from '../utils/sound';

interface ParentTeacherGuideProps {
  onClose: () => void;
}

export const ParentTeacherGuide: React.FC<ParentTeacherGuideProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'six_wh' | 'paragraph_main' | 'sentences' | 'idioms' | 'punctuation'>('six_wh');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-6 shadow-2xl text-slate-100 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xl shadow-inner">
              👨‍🏫
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>資深中文教師 · 課堂伴學與教學重點指南</span>
              </h2>
              <p className="text-xs text-slate-400">
                對標國小一至六年級中國語文課程標準（課綱與試題策略精要）
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex items-center gap-1.5 pt-3 overflow-x-auto text-xs pb-1 border-b border-slate-800/80">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('six_wh');
            }}
            className={`px-3 py-1.5 font-bold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'six_wh'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ① 記敘六要素與六何法
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('paragraph_main');
            }}
            className={`px-3 py-1.5 font-bold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'paragraph_main'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ② 段旨概括三法
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('sentences');
            }}
            className={`px-3 py-1.5 font-bold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'sentences'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ③ 句式與排句成段
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('idioms');
            }}
            className={`px-3 py-1.5 font-bold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'idioms'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ④ 成語四大法寶
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('punctuation');
            }}
            className={`px-3 py-1.5 font-bold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'punctuation'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⑤ 標點符號規範
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto py-4 text-xs space-y-4 pr-1 text-slate-200">
          {activeTab === 'six_wh' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl">
                <h4 className="font-bold text-emerald-300 text-sm mb-1.5 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4" />
                  <span>記敘文六要素與「六何法」提問思維（中年級核心）</span>
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  任何記敘文章均由「六要素」構成。通過向自己提出六個關鍵問題，能快速梳理事件來龍去脈與故事主旨：
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <strong className="text-amber-400 block mb-0.5">何時（When）</strong>
                  <span>故事發生的具體時間或時間跨度（如「去年夏天」「上個星期六」）。</span>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <strong className="text-amber-400 block mb-0.5">何地（Where）</strong>
                  <span>事件展開的地點環境（如「西貢碼頭」「學校禮堂」「抱石場」）。</span>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <strong className="text-amber-400 block mb-0.5">何人（Who）</strong>
                  <span>登場主角、主要人物及其性格特徵、言行舉止。</span>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <strong className="text-amber-400 block mb-0.5">何事（What）</strong>
                  <span>核心情節：起因、經過、高潮、結尾所經歷的事件。</span>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <strong className="text-amber-400 block mb-0.5">為何（Why）</strong>
                  <span>人物採取特定舉動背後的心理動機與根本原因。</span>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <strong className="text-amber-400 block mb-0.5">如何（How）</strong>
                  <span>問題如何被解決、結局如何演變、人物得到何種體會與感悟。</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'paragraph_main' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-sky-950/20 border border-sky-500/30 rounded-2xl">
                <h4 className="font-bold text-sky-300 text-sm mb-1.5">
                  三種提煉段旨與中心思想的實戰技巧（取自教材精要）
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  小學閱讀理解最常犯的錯誤是「誤把局部的枝節當作整段的大意」。學會以下三種方法即可百發百中：
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 bg-slate-800/70 rounded-xl border border-slate-700">
                  <span className="font-bold text-amber-300 text-xs">方法一：提取法（詞語串聯法）</span>
                  <p className="text-slate-300 mt-1">
                    將段落分成若干句子，順著脈絡圈出每句的核心重點詞語，再串連起來。常以動詞起首，如「記述……」「交代……」「解釋……的原因」。
                  </p>
                </div>
                <div className="p-3 bg-slate-800/70 rounded-xl border border-slate-700">
                  <span className="font-bold text-amber-300 text-xs">方法二：摘句法（中心句提煉）</span>
                  <p className="text-slate-300 mt-1">
                    找出段落中直接概括全段內容的「中心句」（通常位於段首或段尾，少數在中間）。只需把中心句稍微修飾，便成為段旨。
                  </p>
                </div>
                <div className="p-3 bg-slate-800/70 rounded-xl border border-slate-700">
                  <span className="font-bold text-amber-300 text-xs">方法三：歸納法（分層總結）</span>
                  <p className="text-slate-300 mt-1">
                    若段落結構多樣，先將句子劃分為兩到三層，概括每一層的大意，再綜合歸納出全段核心思想。
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sentences' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-purple-950/20 border border-purple-500/30 rounded-2xl">
                <h4 className="font-bold text-purple-300 text-sm mb-1.5">
                  句式建構與排句成段技巧
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  幫助孩子打通「從詞到句、從句到段」的思維邏輯鏈條：
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 bg-slate-800/70 rounded-xl border border-slate-700">
                  <strong className="text-sky-300 block mb-1">【排句成段四步順序】</strong>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    <li>時間先後法（朝代更迭、一日早晚、季節演進）</li>
                    <li>代詞指代對象（「這種情況」「它」「他們」）</li>
                    <li>空間步移法（遊記動線：門前 ➔ 走廊 ➔ 核心）</li>
                    <li>因果與轉折連詞搭配（先因後果、先讓步後轉折）</li>
                  </ul>
                </div>
                <div className="p-3 bg-slate-800/70 rounded-xl border border-slate-700">
                  <strong className="text-amber-300 block mb-1">【高頻考點複句搭配】</strong>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    <li><strong>遞進</strong>：不但……而且…… / 不僅……還……</li>
                    <li><strong>轉折</strong>：雖然……但是…… / 儘管……依然……</li>
                    <li><strong>假設</strong>：如果……就…… / 要是……就……</li>
                    <li><strong>條件</strong>：只要……就…… / 無論……都……</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'idioms' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-rose-950/20 border border-rose-500/30 rounded-2xl">
                <h4 className="font-bold text-rose-300 text-sm mb-1.5">
                  《躍思成語法寶王》四大分類體系
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  避免枯燥死記硬背，將小學必學 40 大成語融入四件趣味法寶中：
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 bg-slate-800/70 rounded-xl border border-slate-700">
                  <strong className="text-rose-400">法寶一：壞行為粉刷（糾正缺點與貶義成語）</strong>
                  <div className="text-slate-400 mt-0.5">
                    一毛不拔、手忙腳亂、目中無人、半途而廢、自高自大、灰頭土臉、吞吞吐吐、爭先恐後、狐假虎威、膽小如鼠。
                  </div>
                </div>
                <div className="p-2.5 bg-slate-800/70 rounded-xl border border-slate-700">
                  <strong className="text-amber-400">法寶二：心情魔術貼（情緒與心理描繪）</strong>
                  <div className="text-slate-400 mt-0.5">
                    六神無主、有口難言、同甘共苦、坐立不安、望而生畏、得意忘形、喜氣洋洋、暴跳如雷、興高采烈、歡天喜地。
                  </div>
                </div>
                <div className="p-2.5 bg-slate-800/70 rounded-xl border border-slate-700">
                  <strong className="text-emerald-400">法寶三：處事伸縮槌（修養與為人處事）</strong>
                  <div className="text-slate-400 mt-0.5">
                    一落千丈、寸步難移、出人頭地、自知之明、東山再起、溫故知新、搖頭晃腦、勤能補拙、談天說地、鐵杵磨針。
                  </div>
                </div>
                <div className="p-2.5 bg-slate-800/70 rounded-xl border border-slate-700">
                  <strong className="text-sky-400">法寶四：景和物組合膠水（景物描寫神筆）</strong>
                  <div className="text-slate-400 mt-0.5">
                    一目了然、一錢不值、土生土長、五顏六色、天涯海角、古色古香、風土人情、取之不盡、魚米之鄉、無價之寶。
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'punctuation' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-amber-950/20 border border-amber-500/30 rounded-2xl">
                <h4 className="font-bold text-amber-300 text-sm mb-1.5">
                  常見易混淆標點符號規範指南
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  標點符號是語文呼吸的節奏，重點掌握以下易錯點：
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 bg-slate-800/70 rounded-xl border border-slate-700">
                  <span className="font-bold text-white">破折號（——）vs 括號（（ ））</span>
                  <p className="text-slate-300 mt-0.5">
                    破折號佔兩格，其引導的補充說明是正文的一部分；括號內的文字則是旁註說明，可不直接讀出。
                  </p>
                </div>
                <div className="p-2.5 bg-slate-800/70 rounded-xl border border-slate-700">
                  <span className="font-bold text-white">單引號（「」）vs 雙引號（『』）</span>
                  <p className="text-slate-300 mt-0.5">
                    一般引話用單引號「」；當引語中還要再引用別人話語或特定專有名詞時，內部使用雙引號『』。
                  </p>
                </div>
                <div className="p-2.5 bg-slate-800/70 rounded-xl border border-slate-700">
                  <span className="font-bold text-white">省略號（……）</span>
                  <p className="text-slate-300 mt-0.5">
                    由六個小圓點組成，佔兩格。表示說話斷斷續續、列舉內容的省略或引文省略。
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors"
          >
            關閉指南
          </button>
        </div>
      </div>
    </div>
  );
};
