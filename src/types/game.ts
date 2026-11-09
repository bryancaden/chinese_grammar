export type GradeLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type QuestionCategory = 
  | 'reading'         // 閱讀理解 (段旨、六何、主旨、推斷)
  | 'reorder_sentence'// 重組句子 (積木拼詞)
  | 'reorder_paragraph' // 排句成段 (A/B/C/D 邏輯排序)
  | 'punctuation'     // 標點符號挑戰
  | 'idiom_magic'     // 成語法寶 (法寶王)
  | 'phonetics_vocab';// 注音符號與識字遊戲 (部首/字音)

export interface Question {
  id: string;
  category: QuestionCategory;
  grade: GradeLevel;
  title: string;
  instruction: string;
  // If reading comprehension
  readingPassage?: {
    title: string;
    author?: string;
    paragraphs: string[];
    pinyinVocab?: { word: string; pinyin: string; def: string }[];
  };
  prompt: string;
  
  // Question representation:
  // 1. Multiple choice
  options?: { label: string; text: string }[];
  correctOption?: string; // 'A' | 'B' | 'C' | 'D'
  
  // 2. Sentence reorder (chips)
  wordsToArrange?: string[];
  correctOrderWords?: string[]; // exact sequence
  
  // 3. Paragraph reorder
  paragraphSegments?: { id: string; text: string }[];
  correctOrderIds?: string[]; // e.g. ['A', 'C', 'B', 'D']
  
  // 4. Punctuation fill-in
  sentenceWithBlanks?: string;
  punctuationOptions?: string[];
  correctPunctuation?: string[];

  // 5. Phonetics / Character components
  characterClue?: {
    char: string;
    radical: string;
    pinyin: string;
    strokes: number;
    options: string[];
  };

  explanation: {
    teacherSummary: string; // 資深老師的小錦囊
    keyStrategy: string;    // 解題策略 (e.g. 六何法, 承接複句, 壞行為粉刷成語)
    detailedReason: string; // 詳解
  };
}

export interface Monster {
  id: string;
  name: string;
  title: string;
  avatar: string;
  maxHp: number;
  hp: number;
  attackPower: number;
  themeColor: string;
  attackName: string;
  description: string;
  weakness: string;
}

export interface Stage {
  id: string;
  grade: GradeLevel;
  stageNumber: number;
  name: string;
  chapter: string;
  difficulty: 'easy' | 'medium' | 'hard';
  monster: Monster;
  questions: Question[];
  unlocked: boolean;
  completed: boolean;
  stars: number; // 0 to 3
  rewardMedalId: string;
  bgTheme: 'forest' | 'castle' | 'volcano' | 'ocean' | 'temple';
  mapPosition: { x: number; y: number }; // percentage on map
}

export interface Medal {
  id: string;
  title: string;
  grade: GradeLevel;
  icon: string;
  description: string;
  category: string;
  unlockedAt?: string;
}

export interface CharacterConfig {
  name: string;
  skinTone: string;
  hairColor: string;
  shirtColor: string;
  pantsColor: string;
  hatStyle: 'knight' | 'cap' | 'scholar' | 'crown' | 'wizard';
  weaponStyle: 'sword' | 'pencil_wand' | 'hammer' | 'book_shield';
}

export interface PlayerStats {
  hp: number;
  maxHp: number;
  gold: number;
  exp: number;
  level: number;
  medals: string[]; // medal IDs
  completedStages: string[];
  stageStars: Record<string, number>;
  wrongQuestions: { question: Question; failedCount: number; lastFailedAt: number }[];
}

export type BattleItemId = 'double_atk' | 'shield' | 'skip_q' | 'heal_heart' | 'eliminate_two';

export interface BattleItem {
  id: BattleItemId;
  name: string;
  cost: number;
  icon: string;
  description: string;
  effectBadge: string;
}

