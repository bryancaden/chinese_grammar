import { Stage, Medal, BattleItem } from '../types/game';

export const BATTLE_ITEMS: BattleItem[] = [
  {
    id: 'double_atk',
    name: '攻擊加倍藥水',
    cost: 30,
    icon: '⚔️',
    description: '使用後，下一次答對題目時對怪獸造成雙倍暴擊傷害！',
    effectBadge: '雙倍攻擊蓄力中',
  },
  {
    id: 'shield',
    name: '積木守護盾牌',
    cost: 25,
    icon: '🛡️',
    description: '形成金光護盾，抵擋怪獸的下一次反擊，避免損失體力！',
    effectBadge: '守護盾牌生效中',
  },
  {
    id: 'heal_heart',
    name: '愛心急救包',
    cost: 20,
    icon: '💖',
    description: '立即為小積人回復 1 顆愛心體力，重回最佳戰鬥狀態！',
    effectBadge: '體力已回復',
  },
  {
    id: 'eliminate_two',
    name: '文曲星排除卡',
    cost: 20,
    icon: '🪄',
    description: '在選擇題中直接排除 2 個錯誤干擾選項，大幅提升命中率！',
    effectBadge: '已排除 2 個錯誤項',
  },
  {
    id: 'skip_q',
    name: '智慧直通卷軸',
    cost: 45,
    icon: '📜',
    description: '由文曲星降臨破除當前難題，直接對怪獸發動強力一擊！',
    effectBadge: '智慧卷軸破關',
  },
];

export const ALL_MEDALS: Medal[] = [
  {
    id: 'm_g1_phonics',
    title: '拼音童心勳章',
    grade: 1,
    icon: '🌱',
    description: '成功攻克一年級自然綠化與童詩關卡，熟練掌握普通話拼音與基礎詞彙！',
    category: '低年級啟蒙',
  },
  {
    id: 'm_g2_pet_story',
    title: '萌寵故事探索勳章',
    grade: 2,
    icon: '🐱',
    description: '完成二年級《小貓剪鬍鬚》與生字部首挑戰，理清記敘事件因果！',
    category: '生字與記敘',
  },
  {
    id: 'm_g3_six_elements',
    title: '六何思維勇者勳章',
    grade: 3,
    icon: '🧗',
    description: '掌握記敘文六要素，能運用「何時、何地、何人、何事、為何、如何」剖析文章！',
    category: '高階思維',
  },
  {
    id: 'm_g4_idiom_magic',
    title: '成語法寶大師勳章',
    grade: 4,
    icon: '📜',
    description: '通曉「壞行為粉刷」「心情魔術貼」「處事伸縮槌」等40大精選成語！',
    category: '成語法寶',
  },
  {
    id: 'm_g4_punctuation',
    title: '標點符號天平勳章',
    grade: 4,
    icon: '🖋️',
    description: '攻破破折號、省略號、雙引號與分號迷宮，讓標點精準到位！',
    category: '標點精練',
  },
  {
    id: 'm_g4_sentence_builder',
    title: '段落架構師勳章',
    grade: 4,
    icon: '🏗️',
    description: '精通排句成段與複句重組，掌握時間線索、代詞指代與關聯詞邏輯！',
    category: '句段建構',
  },
  {
    id: 'm_g5_deep_reader',
    title: '文思泉湧賢者勳章',
    grade: 5,
    icon: '📚',
    description: '深入理解《二十美元的價值》與《莫札特》，精準提煉文章段旨與主旨！',
    category: '閱讀進階',
  },
  {
    id: 'm_g6_ancient_poetry',
    title: '古今博雅傳奇勳章',
    grade: 6,
    icon: '👑',
    description: '挑戰《螳螂捕蟬》文言哲理與范成大《四時田園雜興》，登頂語文巔峰！',
    category: '古詩文淬鍊',
  },
];

export const INITIAL_STAGES: Stage[] = [
  // =================== GRADE 1 ===================
  {
    id: 'stage_g1_1',
    grade: 1,
    stageNumber: 1,
    name: '翡翠平原新手森林',
    chapter: '童詩與普通話拼音：《大家一起來綠化》',
    difficulty: 'easy',
    bgTheme: 'forest',
    mapPosition: { x: 26, y: 78 },
    unlocked: true,
    completed: false,
    stars: 0,
    rewardMedalId: 'm_g1_phonics',
    monster: {
      id: 'm_ink_blob',
      name: '小黏黏墨汁怪',
      title: '愛在課本塗鴉的小怪獸',
      avatar: 'slime',
      maxHp: 80,
      hp: 80,
      attackPower: 1,
      themeColor: '#10b981',
      attackName: '墨汁泡泡噴射',
      description: '它會把生字的普通話拼音搞亂，讓句子讀不通順！',
      weakness: '朗讀童詩與正確拼音聲調',
    },
    questions: [
      {
        id: 'q_g1_1_1',
        category: 'reading',
        grade: 1,
        title: '童詩欣賞：《大家一起來綠化》',
        instruction: '細讀童詩，回答問題。點擊語音按鈕可聽普通話或廣東話朗讀喔！',
        readingPassage: {
          title: '大家一起來綠化',
          paragraphs: [
            '小朋友，大朋友，踏出家門走一走。',
            '天氣晴，風兒清，正是綠化好時候。',
            '伸出小手來栽花，齊齊翻土種大樹。',
            '勤捉蟲，常澆水，植物和我做朋友。',
            '我對它們招招手，它們對我點點頭。'
          ],
          pinyinVocab: [
            { word: '栽', pinyin: 'zāi', def: '種植花草樹木' },
            { word: '澆', pinyin: 'jiāo', def: '用水灌溉土壤' },
            { word: '晴', pinyin: 'qíng', def: '天空中沒有雲霧，陽光明媚' }
          ]
        },
        prompt: '詩中最後一句「我對它們招招手，它們對我點點頭」，句中的「它們」是指甚麼？',
        options: [
          { label: 'A', text: '小朋友和大朋友' },
          { label: 'B', text: '植物（剛種的花朵和大樹）' },
          { label: 'C', text: '小蟲子和小鳥' },
          { label: 'D', text: '天上的雲朵' }
        ],
        correctOption: 'B',
        explanation: {
          teacherSummary: '【陳老師小叮嚀】：代詞「它們」要看前一句提到了誰喔！',
          keyStrategy: '上下文代詞指代檢索',
          detailedReason: '前文提到「伸出小手來栽花，齊齊翻土種大樹……植物和我做朋友」，所以「我」招手對象是剛剛栽種的植物（花與樹）。'
        }
      },
      {
        id: 'q_g1_1_2',
        category: 'reorder_sentence',
        grade: 1,
        title: '積木拼句：植樹好時光',
        instruction: '依據語序，依序點選詞語積木，組成通順的句子！',
        prompt: '請將下列打亂的詞卡拼成通順的句子：',
        wordsToArrange: ['晴朗的', '春天，', '我們', '在花園裏', '快樂地', '栽花。'],
        correctOrderWords: ['晴朗的', '春天，', '我們', '在花園裏', '快樂地', '栽花。'],
        explanation: {
          teacherSummary: '【陳老師小叮嚀】：先找「時間」與「誰」，再接「在哪裡」「做什麼」！',
          keyStrategy: '基本句型結構（時間＋人物＋地點＋動作）',
          detailedReason: '「晴朗的春天，（時間）我們（人物）在花園裏（地點）快樂地栽花。（動作）」順序最自然流暢。'
        }
      },
      {
        id: 'q_g1_1_3',
        category: 'phonetics_vocab',
        grade: 1,
        title: '普通話拼音與部首：木字家族',
        instruction: '找出屬於「木」字部首且拼音正確的字！',
        prompt: '「栽花」的「栽」字，普通話拼音與部首分別是甚麼？',
        options: [
          { label: 'A', text: 'zāi · 木部（與樹木植物栽種有關）' },
          { label: 'B', text: 'zhāi · 土部' },
          { label: 'C', text: 'cāi · 戈部' },
          { label: 'D', text: 'zāi · 日部' }
        ],
        correctOption: 'A',
        explanation: {
          teacherSummary: '【陳老師小叮嚀】：栽的聲母是 z，一聲平調 zāi，部首在下方是木！',
          keyStrategy: '形聲字部首形義關係與普通話拼音',
          detailedReason: '「栽」字下方為「木」，拼音為 zāi，本義就是把植物種到土裏。'
        }
      },
      {
        id: 'q_g1_1_4',
        category: 'reorder_sentence',
        grade: 1,
        title: '積木拼句：春風與花草',
        instruction: '點擊下方詞語積木，組裝成通暢優美的句子！',
        prompt: '請將詞卡重組成通順的擬人句子：',
        wordsToArrange: ['溫暖的', '春風，', '輕輕地', '吹拂著', '綠油油的', '草地。'],
        correctOrderWords: ['溫暖的', '春風，', '輕輕地', '吹拂著', '綠油油的', '草地。'],
        explanation: {
          teacherSummary: '【陳老師小叮嚀】：形容詞「溫暖的」修飾「春風」，「輕輕地」修飾「吹拂著」！',
          keyStrategy: '修飾語與中心語的搭配',
          detailedReason: '「溫暖的春風，輕輕地吹拂著綠油油的草地。」結構完整，意境生動。'
        }
      }
    ]
  },

  // =================== GRADE 2 ===================
  {
    id: 'stage_g2_1',
    grade: 2,
    stageNumber: 2,
    name: '南海青洲萌寵庭院',
    chapter: '生活趣味記敘：《我給小貓剪鬍鬚》',
    difficulty: 'easy',
    bgTheme: 'ocean',
    mapPosition: { x: 18, y: 64 },
    unlocked: true,
    completed: false,
    stars: 0,
    rewardMedalId: 'm_g2_pet_story',
    monster: {
      id: 'm_typo_troll',
      name: '胡鬧剪刀怪',
      title: '喜歡把貓鬍鬚剪短的搗蛋鬼',
      avatar: 'troll',
      maxHp: 100,
      hp: 100,
      attackPower: 1,
      themeColor: '#f59e0b',
      attackName: '亂剪狂風',
      description: '自以為是做聰明事，實際上把事情弄得一團糟！',
      weakness: '記敘順序與因果推理',
    },
    questions: [
      {
        id: 'q_g2_1_1',
        category: 'reading',
        grade: 2,
        title: '生活記敘：《我給小貓剪鬍鬚》',
        instruction: '讀懂文章內容，注意小貓鬍鬚的真正功能與拼音。',
        readingPassage: {
          title: '我給小貓剪鬍鬚',
          paragraphs: [
            '我家有一隻可愛的小貓。奇怪的是，牠整天抓自己的鬍鬚。',
            '一天，我看到爸爸刮鬍子，想到了好主意：拿小剪刀把小貓細長的鬍鬚全剪掉了。小貓好奇望著我，好像不明白發生了甚麼事。',
            '爸爸一看生氣地說：「小貓通過門縫時，鬍鬚能測量身寬；剪掉鬍鬚，小貓通過門縫就會被撞到或卡住！」聽了這話，我紅著臉低下了頭。'
          ],
          pinyinVocab: [
            { word: '鬍鬚', pinyin: 'hú xū', def: '長在嘴邊的毛鬚' },
            { word: '卡住', pinyin: 'kǎ zhù', def: '夾在當中動彈不得' },
            { word: '門縫', pinyin: 'mén fèng', def: '門與門框之間的狹縫' }
          ]
        },
        prompt: '爸爸為甚麼生氣？小貓的鬍鬚有甚麼關鍵功能？',
        options: [
          { label: 'A', text: '鬍鬚能幫小貓保暖，剪掉會著涼' },
          { label: 'B', text: '小貓通過窄縫時，鬍鬚是量度寬度的天然尺規' },
          { label: 'C', text: '小貓沒有鬍鬚就抓不到老鼠' },
          { label: 'D', text: '剪刀太危險，會弄傷沙發' }
        ],
        correctOption: 'B',
        explanation: {
          teacherSummary: '【陳老師小叮嚀】：仔細看爸爸說的話「鬍鬚能過，小貓的身體就能過」！',
          keyStrategy: '關鍵語句檢索與生物常識理解',
          detailedReason: '貓的鬍鬚兩端寬度與身體寬度相當，是用來感測縫隙大小以防被卡住的感覺器官。'
        }
      },
      {
        id: 'q_g2_1_2',
        category: 'reorder_sentence',
        grade: 2,
        title: '因果複句拼砌',
        instruction: '用「因為……所以……」將句子積木拼好！',
        prompt: '請將詞卡重組成通順的因果句：',
        wordsToArrange: ['因為', '小貓的鬍鬚被剪短了，', '所以', '牠不敢', '鑽進狹窄的門縫。'],
        correctOrderWords: ['因為', '小貓的鬍鬚被剪短了，', '所以', '牠不敢', '鑽進狹窄的門縫。'],
        explanation: {
          teacherSummary: '【陳老師小叮嚀】：「因為」後面放原因，「所以」後面接結果！',
          keyStrategy: '因果複句關聯詞配對',
          detailedReason: '前因是鬍鬚被剪短，後果是無法量度而不敢鑽進窄縫。'
        }
      },
      {
        id: 'q_g2_1_3',
        category: 'reorder_paragraph',
        grade: 2,
        title: '事件先後順序排列',
        instruction: '依事情發生的先後次序，排出正確的英文代號順序！',
        prompt: '小作者經歷了哪些事情？請依序排列：',
        paragraphSegments: [
          { id: 'A', text: '作者看到爸爸刮鬍子，靈機一動' },
          { id: 'B', text: '作者拿小剪刀剪光了小貓的鬍鬚' },
          { id: 'C', text: '爸爸解釋鬍鬚的用處並嚴肅告誡' },
          { id: 'D', text: '作者明白做錯了，慚愧地紅著臉低下頭' }
        ],
        correctOrderIds: ['A', 'B', 'C', 'D'],
        explanation: {
          teacherSummary: '【陳老師小叮嚀】：按照「看見發端 → 行動過程 → 師長指正 → 領悟反思」的順序！',
          keyStrategy: '記敘事情發展四步法（起因、經過、高潮、結果）',
          detailedReason: '先是看到爸爸刮鬍子引起動機（A），接著實施剪鬍鬚（B），被爸爸發現並解釋（C），最後知錯慚愧（D）。'
        }
      }
    ]
  },

  // =================== GRADE 3 ===================
  {
    id: 'stage_g3_1',
    grade: 3,
    stageNumber: 3,
    name: '白雪神山抱石之巔',
    chapter: '記敘六要素與高階思維：《抱石初體驗》',
    difficulty: 'medium',
    bgTheme: 'castle',
    mapPosition: { x: 44, y: 44 },
    unlocked: true,
    completed: false,
    stars: 0,
    rewardMedalId: 'm_g3_six_elements',
    monster: {
      id: 'm_rock_golem',
      name: '懼高峭壁泥怪',
      title: '專門吸食孩子勇氣的岩石守衛',
      avatar: 'golem',
      maxHp: 120,
      hp: 120,
      attackPower: 1,
      themeColor: '#6366f1',
      attackName: '膽小石雨',
      description: '讓人手腳發抖，想要退縮到牆角放棄！',
      weakness: '記敘文六何法與正反思考',
    },
    questions: [
      {
        id: 'q_g3_1_1',
        category: 'reading',
        grade: 3,
        title: '高階記敘理解：《抱石初體驗》',
        instruction: '閱讀文章，分析人物心理與「正反思考」。',
        readingPassage: {
          title: '抱石初體驗',
          paragraphs: [
            '暑期夏令營第三天的活動是抱石。芷晴懷著不安的心情和同學們來到抱石場。她一向怕高，每次踏足高處時都感到非常緊張，渾身顫抖。這次攀登石牆既沒有繩索輔助，又不能戴頭盔等護具，一想到這些，她就更害怕了。芷晴卻退到角落，不想參加。',
            '思婷是芷晴的朋友，她看到芷晴沒精打采的樣子，便走到她身旁鼓勵她。思婷帶芷晴摸了摸放在石牆底下的厚墊，對她說：「你看，這堵牆並不高，下面又有厚墊保護，這是你克服怕高的好機會呢！」',
            '芷晴用力壓了壓墊子，發現果然非常厚實。得到思婷的鼓勵，芷晴稍微放心了，決定鼓起勇氣面對自己害怕的事。輪到芷晴攀爬時，她集中精神，一步一步向上爬，終於順利爬到頂點！'
          ],
          pinyinVocab: [
            { word: '顫抖', pinyin: 'zhàn dǒu', def: '發抖、哆嗦' },
            { word: '厚實', pinyin: 'hòu shi', def: '厚而結實' },
            { word: '輔助', pinyin: 'fǔ zhù', def: '在旁協助' }
          ]
        },
        prompt: '文中思婷帶芷晴去摸牆底厚墊的「主要目的」是甚麼？（高階思維：推斷人物用意）',
        options: [
          { label: 'A', text: '讓芷晴知道墊子是什麼材質做的' },
          { label: 'B', text: '向芷晴證明厚墊比安全頭盔更有用' },
          { label: 'C', text: '用安全設施的事實化解恐懼，增加芷晴的信心' },
          { label: 'D', text: '教導芷晴摔下來時翻滾的技巧' }
        ],
        correctOption: 'C',
        explanation: {
          teacherSummary: '【陳老師小叮嚀】：思婷說「下面有厚墊保護，是克服怕高的好機會」，是在用客觀安全事實打消疑慮！',
          keyStrategy: '高階思維：意圖推斷與正反思考',
          detailedReason: '芷晴一開始因為沒繩索而害怕（反面擔心），思婷透過讓她觸摸厚實安全墊（正面支持），建立安全感與勇氣。'
        }
      },
      {
        id: 'q_g3_1_2',
        category: 'reorder_sentence',
        grade: 3,
        title: '轉折複句挑戰（雖然……但是……）',
        instruction: '重組帶有轉折關係的句子！',
        prompt: '請重新排列下列詞卡，組成符合文意的通順句子：',
        wordsToArrange: ['雖然', '攀登抱石牆', '沒有繩索輔助，', '但是', '地面有厚實的安全墊', '保障安全。'],
        correctOrderWords: ['雖然', '攀登抱石牆', '沒有繩索輔助，', '但是', '地面有厚實的安全墊', '保障安全。'],
        explanation: {
          teacherSummary: '【陳老師小叮嚀】：「雖然」引出既有條件或不足，「但是」轉折出安心的保障！',
          keyStrategy: '轉折複句的關聯詞位置',
          detailedReason: '「雖然……但是……」表示後者意思與前者有轉折補充，結構緊密。'
        }
      },
      {
        id: 'q_g3_1_3',
        category: 'reorder_paragraph',
        grade: 3,
        title: '記敘六要素線索排序（時序線）',
        instruction: '依事情發生的時序，將各句排出正確順序：',
        prompt: '小作者在抱石活動中的心理和行動是如何變化的？請依時序排出正確順序：',
        paragraphSegments: [
          { id: 'A', text: '芷晴因為怕高而退縮在角落，不想參加抱石' },
          { id: 'B', text: '思婷熱心帶她摸厚墊並給予溫暖鼓勵' },
          { id: 'C', text: '芷晴下定決心踏出第一步嘗試攀爬' },
          { id: 'D', text: '芷晴在同學歡呼聲中成功登上頂點克服恐懼' }
        ],
        correctOrderIds: ['A', 'B', 'C', 'D'],
        explanation: {
          teacherSummary: '【陳老師小叮嚀】：從心理退縮(A)到朋友鼓勵(B)，再到鼓起勇氣(C)，最後贏得勝利(D)。',
          keyStrategy: '情節推進時序分析',
          detailedReason: '符合記敘文「遇到困難 -> 獲得轉機 -> 努力行動 -> 達成結果」的經典結構。'
        }
      }
    ]
  },

  // =================== GRADE 4 - IDIOMS ===================
  {
    id: 'stage_g4_idiom',
    grade: 4,
    stageNumber: 4,
    name: '北方千湖成語法寶閣',
    chapter: '《躍思成語法寶王》四大法寶對決',
    difficulty: 'medium',
    bgTheme: 'temple',
    mapPosition: { x: 58, y: 28 },
    unlocked: true,
    completed: false,
    stars: 0,
    rewardMedalId: 'm_g4_idiom_magic',
    monster: {
      id: 'm_idiom_demon',
      name: '詞窮噴霧怪',
      title: '成語大迷宮的看守者',
      avatar: 'sorcerer',
      maxHp: 140,
      hp: 140,
      attackPower: 1,
      themeColor: '#ec4899',
      attackName: '亂用成語魔咒',
      description: '它會把褒義成語用在壞事上，把近義成語混淆！',
      weakness: '成語法寶辨析（褒貶義與語境）',
    },
    questions: [
      {
        id: 'q_g4_id_1',
        category: 'idiom_magic',
        grade: 4,
        title: '法寶一：壞行為粉刷（普通話拼音與成語辨析）',
        instruction: '選出最符合句意的成語法寶。',
        prompt: '「子明平日自私小氣，連一顆糖果都不肯分給朋友；今天竟然主動帶了一大包零食分給全班，真是一反常態！」句中子明平時的態度最適合用哪句成語形容？其普通話拼音為何？',
        options: [
          { label: 'A', text: '手忙腳亂（shǒu máng jiǎo luàn，形容做事慌張混亂）' },
          { label: 'B', text: '一毛不拔（yī máo bù bá，形容極度自私吝嗇）' },
          { label: 'C', text: '目中無人（mù zhōng wú rén，形容驕傲自大看不起人）' },
          { label: 'D', text: '狐假虎威（hú jiǎ hǔ wēi，形容倚仗別人勢力欺壓人）' }
        ],
        correctOption: 'B',
        explanation: {
          teacherSummary: '【陳老師小叮嚀】：連一根汗毛都不肯拔出來，比喻非常吝嗇！拼音是 yī máo bù bá。',
          keyStrategy: '《成語法寶王》壞行為粉刷單元：一毛不拔的典故與用法',
          detailedReason: '「一毛不拔」出自《孟子》，形容自私吝嗇，不肯拿出一點點東西幫助別人。'
        }
      },
      {
        id: 'q_g4_id_2',
        category: 'idiom_magic',
        grade: 4,
        title: '法寶二：心情魔術貼（成語近反義與感情色彩）',
        instruction: '判斷成語的褒貶色彩與心情描寫。',
        prompt: '下列四個形容心情與處事的成語中，哪一個屬於「褒義詞（正面讚美）」？',
        options: [
          { label: 'A', text: '得意忘形（dé yì wàng xíng，高興過了頭而舉止失常）' },
          { label: 'B', text: '暴跳如雷（bào tiào rú léi，怒極踩腳狂吼）' },
          { label: 'C', text: '同甘共苦（tóng gān gòng kǔ，一同承受歡樂與患難，團結互助）' },
          { label: 'D', text: '六神無主（liù shén wú zhǔ，驚慌著急不知所措）' }
        ],
        correctOption: 'C',
        explanation: {
          teacherSummary: '【陳老師小叮嚀】：褒義代表正向、讚許；貶義代表指責或缺點。',
          keyStrategy: '成語感情色彩（褒義 vs 貶義）分類',
          detailedReason: '「同甘共苦」是同甘甜、共困苦，讚揚真摯深厚的情誼；其餘A、B、D皆為貶義或負面情緒描述。'
        }
      },
      {
        id: 'q_g4_id_3',
        category: 'idiom_magic',
        grade: 4,
        title: '法寶三：處事伸縮槌（成語填空與字形）',
        instruction: '找出正確填入空格的字，讓成語完整。',
        prompt: '「只要我們肯下苦功，哪怕資質再普通，也能抱著『鐵＿磨針』的毅力取得成功。」空格應填入哪一個字？',
        options: [
          { label: 'A', text: '棒' },
          { label: 'B', text: '杵（chǔ，木字旁）' },
          { label: 'C', text: '柱' },
          { label: 'D', text: '木' }
        ],
        correctOption: 'B',
        explanation: {
          teacherSummary: '【陳老師小叮嚀】：「杵」的普通話拼音是 chǔ，是舂米或搗藥用的粗圓棒，形旁是木！',
          keyStrategy: '成語字形與形近字辨正',
          detailedReason: '「鐵杵磨針」比喻只要有恆心毅力，再艱難的事也能辦到。注意不要誤寫為「鐵柱」或「鐵棒」。'
        }
      }
    ]
  },

  // =================== GRADE 4 - PUNCTUATION & PARAGRAPH ===================
  {
    id: 'stage_g4_grammar',
    grade: 4,
    stageNumber: 5,
    name: '東谷文法標點守護殿',
    chapter: '標點精練與排句成段（代詞與首尾句）',
    difficulty: 'medium',
    bgTheme: 'castle',
    mapPosition: { x: 68, y: 38 },
    unlocked: true,
    completed: false,
    stars: 0,
    rewardMedalId: 'm_g4_punctuation',
    monster: {
      id: 'm_octo_punct',
      name: '八爪標點章魚獸',
      title: '專門吃掉標點符號的混亂魔靈',
      avatar: 'kraken',
      maxHp: 150,
      hp: 150,
      attackPower: 1,
      themeColor: '#0ea5e9',
      attackName: '斷句噴墨旋風',
      description: '把句號變逗號，把引號倒轉，讓整篇文章無法斷句！',
      weakness: '破折號、省略號、雙引號之正確使用',
    },
    questions: [
      {
        id: 'q_g4_punc_1',
        category: 'punctuation',
        grade: 4,
        title: '標點精練：破折號與括號的區別',
        instruction: '選出標點符號使用最恰當的一項。',
        prompt: '「姐姐的偶像是葉詠詩＿＿香港著名女指揮家。」此處橫線上用來做進一步的解釋說明，最規範的標點是甚麼？',
        options: [
          { label: 'A', text: '破折號（——），佔兩格，用於正文中的解釋說明' },
          { label: 'B', text: '問號（？），用於疑問語句末尾' },
          { label: 'C', text: '省略號（……），用於引文或列舉的省略' },
          { label: 'D', text: '雙引號（『』），用於引號內部的再次引用' }
        ],
        correctOption: 'A',
        explanation: {
          teacherSummary: '【陳老師小叮嚀】：破折號是橫線佔兩格，後面接的文字屬於正文的重要補充說明！',
          keyStrategy: '《標點符號精練》破折號功能解密',
          detailedReason: '破折號（——）用於表示解釋、說明，與括號不同的是，破折號引出的解釋語屬於正文內容，閱讀時需連貫讀出。'
        }
      },
      {
        id: 'q_g4_para_1',
        category: 'reorder_paragraph',
        grade: 4,
        title: '排句成段：尋找代詞指代對象（極光之謎）',
        instruction: '先找出首句（交代背景），再順著代詞「這種現象」「它」理順句子！',
        prompt: '請將下列描寫「極光」的四個句子排列成通順完整的段落：',
        paragraphSegments: [
          { id: 'A', text: '在北極或南極，有時夜晚會出現一些彩色光帶' },
          { id: 'B', text: '光帶互相交織在一起，直到點亮整片夜空' },
          { id: 'C', text: '這種現象就是極光' },
          { id: 'D', text: '它是太陽風擾動地球磁場而產生的光芒' }
        ],
        correctOrderIds: ['A', 'B', 'C', 'D'],
        explanation: {
          teacherSummary: '【陳老師小叮嚀】：先交代現象出現的「時間與地點(A)」，接著描述「光帶交織(B)」，再以「這種現象指代(C)」，最後揭示科學原理「它是…(D)」。',
          keyStrategy: '《跟我想系列 排句成段》找出代詞指代對象法',
          detailedReason: 'A為首句背景，B承接光帶，C用「這種現象」總結命名，D用「它」承接極光進行原理解析。'
        }
      },
      {
        id: 'q_g4_sent_1',
        category: 'reorder_sentence',
        grade: 4,
        title: '遞進複句積木拼接（不僅……而且……）',
        instruction: '運用「不僅……而且……」將詞塊重新拼組！',
        prompt: '請重新排列下列詞卡，拼出具有「更進一層」意思的遞進複句：',
        wordsToArrange: ['萬里長城', '不僅是', '中國古代的偉大建築，', '而且', '被譽為', '世界七大奇蹟之一。'],
        correctOrderWords: ['萬里長城', '不僅是', '中國古代的偉大建築，', '而且', '被譽為', '世界七大奇蹟之一。'],
        explanation: {
          teacherSummary: '【陳老師小叮嚀】：後半分句的意思比前半分句「更進一層」，這就是遞進！',
          keyStrategy: '遞進複句關聯詞配搭',
          detailedReason: '由「中國古代偉大建築」更進一步上升到「世界七大奇蹟之一」，前後層次分明。'
        }
      }
    ]
  },

  // =================== GRADE 5 ===================
  {
    id: 'stage_g5_1',
    grade: 5,
    stageNumber: 6,
    name: '東南黑岩熔岩深淵',
    chapter: '深度記敘與主旨：《二十美元的價值》',
    difficulty: 'hard',
    bgTheme: 'volcano',
    mapPosition: { x: 74, y: 56 },
    unlocked: true,
    completed: false,
    stars: 0,
    rewardMedalId: 'm_g5_deep_reader',
    monster: {
      id: 'm_syntax_wyrm',
      name: '狂妄讀解黑龍',
      title: '盤踞在文字頂點的智慧巨龍',
      avatar: 'dragon',
      maxHp: 180,
      hp: 180,
      attackPower: 1,
      themeColor: '#ef4444',
      attackName: '混亂思維烈焰',
      description: '只有看穿故事深層主旨的人，才能穿透牠的龍鱗！',
      weakness: '主旨歸納、深層情感提煉與批判思考',
    },
    questions: [
      {
        id: 'q_g5_1_1',
        category: 'reading',
        grade: 5,
        title: '深度記敘：《二十美元的價值》',
        instruction: '細讀節選，探究文章的核心主旨。',
        readingPassage: {
          title: '二十美元的價值',
          paragraphs: [
            '父親拖著疲憊的身體回家。五歲的兒子在門口怯生生地問：「爸爸，您一小時能賺多少錢？」父親不耐煩地答道：「二十美元。你問這個做甚麼？」兒子低頭又問：「爸，您可以借我十美元嗎？」父親發怒了：「如果你想借錢買玩具，就給我回房睡覺！」兒子失望地默默回房。',
            '過了一會兒，父親平靜下來感到內疚，走到兒子床邊拿出十美元遞給他。兒子高興地從枕頭下拿出幾張皺巴巴的鈔票，慢慢湊著。父親驚訝地問：「你已經有錢了，怎麼還要借？」',
            '孩子把所有鈔票遞給父親，真誠地說：「爸，我現在湊足二十美元了。我可以向您買一個小時嗎？明天請您早一點回家，我想和您一起吃晚飯。」'
          ],
          pinyinVocab: [
            { word: '怯生生', pinyin: 'qiè shēng shēng', def: '害羞膽小的樣子' },
            { word: '內疚', pinyin: 'nèi jiù', def: '心中自感慚愧歉疚' },
            { word: '皺巴巴', pinyin: 'zhòu bā bā', def: '布滿皺紋' }
          ]
        },
        prompt: '這篇文章最核心的「主旨」是甚麼？（高階主旨歸納題）',
        options: [
          { label: 'A', text: '警告天下父母不要亂向孩子發脾氣' },
          { label: 'B', text: '提醒人們：陪伴家人的時間與親情，遠比工作賺錢更珍貴重要' },
          { label: 'C', text: '說明小孩子非常懂得存錢與理財' },
          { label: 'D', text: '批評現代工作工資太低，令人疲憊' }
        ],
        correctOption: 'B',
        explanation: {
          teacherSummary: '【陳老師小叮嚀】：結尾孩子的童言童語「向您買一個小時一起吃晚飯」，直擊心靈！',
          keyStrategy: '篇章主旨歸納三步法（事件分析 -> 人物情感 -> 提煉哲理）',
          detailedReason: '孩子借錢不是為了玩具，而是為了買父親寶貴的一個小時共進晚餐，深刻彰顯了親情陪伴的無價。'
        }
      },
      {
        id: 'q_g5_1_2',
        category: 'reorder_paragraph',
        grade: 5,
        title: '高階步移法排句成段（遊西湖）',
        instruction: '依作者參觀位置的轉換（步移順序），排出正確路線順序！',
        prompt: '請按作者遊覽的腳步移動順序，排列下列句子：',
        paragraphSegments: [
          { id: 'A', text: '下午，姑母帶我到西湖遊覽' },
          { id: 'B', text: '我們走在西湖的蘇堤上，欣賞湖光山色' },
          { id: 'C', text: '迎著清涼的微風，我們走過了幾座古舊的石橋' },
          { id: 'D', text: '沿著堤岸，我們看到遠處精緻的湖心亭和荷花' },
          { id: 'E', text: '最終抵達湖心亭休息，順道觀賞亭邊嫣紅的荷花' }
        ],
        correctOrderIds: ['A', 'B', 'C', 'D', 'E'],
        explanation: {
          teacherSummary: '【陳老師小叮嚀】：留意表示地點轉移的詞語：「到西湖(A) -> 走在蘇堤(B) -> 走過石橋(C) -> 沿著堤岸遠望(D) -> 最終抵達(E)」。',
          keyStrategy: '步移法空間動線梳理',
          detailedReason: '這是典型遊記寫作順序，由起點背景到步移路線，再由遠景到抵達終點停歇。'
        }
      }
    ]
  },

  // =================== GRADE 6 ===================
  {
    id: 'stage_g6_1',
    grade: 6,
    stageNumber: 7,
    name: '北嶺雲巔傳奇天閣',
    chapter: '古文寓言與高階詩文：《螳螂捕蟬》',
    difficulty: 'hard',
    bgTheme: 'temple',
    mapPosition: { x: 52, y: 16 },
    unlocked: true,
    completed: false,
    stars: 0,
    rewardMedalId: 'm_g6_ancient_poetry',
    monster: {
      id: 'm_chimera_king',
      name: '萬卷博雅天王獸',
      title: '守護小學中文終極聖印的傳奇靈獸',
      avatar: 'chimera',
      maxHp: 200,
      hp: 200,
      attackPower: 1,
      themeColor: '#eab308',
      attackName: '斷章取義雷霆波',
      description: '只有真正博古通今、融會貫通的語文小狀元才能降伏牠！',
      weakness: '文言字詞理解、哲理深究與多重因果',
    },
    questions: [
      {
        id: 'q_g6_1_1',
        category: 'reading',
        grade: 6,
        title: '古文寓言賞析：《螳螂捕蟬》（漢·劉向）',
        instruction: '閱讀文言經典，品味其中深遠的警世哲理。',
        readingPassage: {
          title: '螳螂捕蟬',
          author: '漢 · 劉向《說苑》',
          paragraphs: [
            '園中有樹，其上有蟬。蟬高居悲鳴飲露，不知螳螂在其後也。',
            '螳螂委身曲附，欲取蟬，而不知黃雀在其傍也。',
            '黃雀延頸，欲啄螳螂，而不知彈丸在其下也。',
            '此三者皆務欲得其前利，而不顧其後之有患也。'
          ],
          pinyinVocab: [
            { word: '委身曲附', pinyin: 'wěi shēn qū fù', def: '縮起身體緊貼樹枝' },
            { word: '延頸', pinyin: 'yán jǐng', def: '伸長脖子' },
            { word: '務欲', pinyin: 'wù yù', def: '一心只想得到' }
          ]
        },
        prompt: '文中「此三者皆務欲得其前利，而不顧其後之有患也」揭示了甚麼人生智慧？',
        options: [
          { label: 'A', text: '大自然的食物鏈非常殘酷，弱肉強食' },
          { label: 'B', text: '告誡人們不能只專注於眼前的利益，而忽略身後潛伏的巨大危機' },
          { label: 'C', text: '打獵時要耐心等待時機，才能一舉成功' },
          { label: 'D', text: '夏天蟬的叫聲太吵，容易吸引掠食者' }
        ],
        correctOption: 'B',
        explanation: {
          teacherSummary: '【陳老師小叮嚀】：這就是著名成語「螳螂捕蟬，黃雀在後」的出處！',
          keyStrategy: '古代寓言隱喻提煉與生活對照',
          detailedReason: '蟬貪圖露水、螳螂貪圖蟬、黃雀貪圖螳螂，都只看眼前好處而忽視背後的危險，是極具警示性的哲理名篇。'
        }
      },
      {
        id: 'q_g6_1_2',
        category: 'reorder_sentence',
        grade: 6,
        title: '多重複句挑戰（條件＋轉折複句）',
        instruction: '依據嚴密邏輯，組裝多重關係的高階複句！',
        prompt: '請將下列詞卡拼成文意通暢的雙重關聯複句：',
        wordsToArrange: ['無論', '未來的挑戰有多麼艱鉅，', '只要', '我們團結一致，', '就一定能', '克服所有困難。'],
        correctOrderWords: ['無論', '未來的挑戰有多麼艱鉅，', '只要', '我們團結一致，', '就一定能', '克服所有困難。'],
        explanation: {
          teacherSummary: '【陳老師小叮嚀】：「無論……（條件）只要……就……（假設/充要條件）」，表達堅定信念！',
          keyStrategy: '多重複句的層次銜接',
          detailedReason: '「無論」放句首涵蓋所有外部情境，「只要……就……」給出因應的核心解方，語氣鏗鏘有力。'
        }
      }
    ]
  }
];
