/**
 * Web Audio API synthesizer for zero-dependency retro game SFX
 */

class SoundSystem {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  public dialect: 'mandarin' | 'cantonese' = 'mandarin';

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play click / select
  playClick() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Audio not supported
    }
  }

  // Hero Attack (Lego brick laser / sword swing)
  playAttack() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.linearRampToValueAtTime(880, t + 0.12);
      osc.frequency.exponentialRampToValueAtTime(1500, t + 0.22);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(t + 0.26);
    } catch {}
  }

  // Monster Hurt
  playMonsterHit() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.exponentialRampToValueAtTime(50, t + 0.25);

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(t + 0.29);
    } catch {}
  }

  // Monster Counter-Attack
  playMonsterAttack() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, t);
      osc.frequency.linearRampToValueAtTime(70, t + 0.2);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(t + 0.26);
    } catch {}
  }

  // Player Hurt (Heart lost)
  playPlayerHurt() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.linearRampToValueAtTime(140, t + 0.2);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(t + 0.23);
    } catch {}
  }

  // Correct Answer Chime
  playCorrect() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.07);

        gain.gain.setValueAtTime(0.18, t + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.01, t + idx * 0.07 + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + idx * 0.07);
        osc.stop(t + idx * 0.07 + 0.22);
      });
    } catch {}
  }

  // Wrong Answer
  playWrong() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.setValueAtTime(180, t + 0.12);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(t + 0.3);
    } catch {}
  }

  // Stage Victory Fanfare
  playVictory() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      // Arpeggio fanfare: C4, G4, C5, E5, G5, C6
      const fanfare = [
        { f: 261.63, d: 0.12 },
        { f: 392.00, d: 0.12 },
        { f: 523.25, d: 0.14 },
        { f: 659.25, d: 0.14 },
        { f: 783.99, d: 0.18 },
        { f: 1046.5, d: 0.45 },
      ];
      let offset = 0;
      fanfare.forEach((n) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, t + offset);

        gain.gain.setValueAtTime(0.2, t + offset);
        gain.gain.exponentialRampToValueAtTime(0.01, t + offset + n.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + offset);
        osc.stop(t + offset + n.d + 0.05);
        offset += n.d * 0.85;
      });
    } catch {}
  }

  // Cached voices
  private voices: SpeechSynthesisVoice[] = [];
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.initVoices();
  }

  private initVoices() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      this.voices = window.speechSynthesis.getVoices();
      if (typeof window.speechSynthesis.addEventListener === 'function') {
        window.speechSynthesis.addEventListener('voiceschanged', () => {
          this.voices = window.speechSynthesis.getVoices();
        });
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          this.voices = window.speechSynthesis.getVoices();
        };
      }
    } catch {}
  }

  private getVoicesList(): SpeechSynthesisVoice[] {
    if (typeof window === 'undefined' || !window.speechSynthesis) return [];
    if (!this.voices || this.voices.length === 0) {
      this.voices = window.speechSynthesis.getVoices();
    }
    return this.voices || [];
  }

  /**
   * Find standard Mandarin female voice
   * Priorities:
   * 1. High-tier neural/natural Mandarin female voices (Xiaoxiao, Tingting, Xiaoyi, Yaoyao, Huihui, Google 普通话)
   * 2. High-tier Guoyu female voices (HsiaoChen, Mei-Jia, Hanhan, Google 國語)
   * 3. Any Chinese voice with explicit Female marker and non-male
   * 4. Any zh-CN non-male voice
   */
  private findMandarinFemaleVoice(): SpeechSynthesisVoice | undefined {
    const list = this.getVoicesList();
    if (list.length === 0) return undefined;

    const isChinese = (v: SpeechSynthesisVoice) =>
      v.lang.startsWith('zh') || v.lang.startsWith('cmn');

    const isMale = (v: SpeechSynthesisVoice) =>
      /(male|man|男|kangkang|yunxi|yunjian|yunyang|zhiwei|danny|wanlung)/i.test(v.name);

    // Top tier standard Putonghua female voices
    const topTierPutonghuaFemale = list.find(
      (v) =>
        isChinese(v) &&
        !isMale(v) &&
        (v.lang.toLowerCase().includes('cn') || v.lang.toLowerCase().includes('hans')) &&
        /(xiaoxiao|xiaoyi|yaoyao|huihui|ting-?ting|zhiyu|lili|yushu|google.*普通话|natural.*chinese)/i.test(
          v.name
        )
    );
    if (topTierPutonghuaFemale) return topTierPutonghuaFemale;

    // Top tier Guoyu female voices (e.g. HsiaoChen, Mei-Jia, Hanhan)
    const topTierGuoyuFemale = list.find(
      (v) =>
        isChinese(v) &&
        !isMale(v) &&
        /(hsiaochen|hanhan|mei-?jia|google.*國語)/i.test(v.name)
    );
    if (topTierGuoyuFemale) return topTierGuoyuFemale;

    // Any female marked Chinese voice
    const anyFemaleChinese = list.find(
      (v) => isChinese(v) && !isMale(v) && /(female|woman|女)/i.test(v.name)
    );
    if (anyFemaleChinese) return anyFemaleChinese;

    // Any standard zh-CN voice that is not male
    const anyZhCnNonMale = list.find(
      (v) =>
        (v.lang === 'zh-CN' || v.lang === 'zh_CN' || v.lang.startsWith('zh-CN')) &&
        !isMale(v)
    );
    if (anyZhCnNonMale) return anyZhCnNonMale;

    // Any zh-TW voice that is not male
    const anyZhTwNonMale = list.find(
      (v) => (v.lang === 'zh-TW' || v.lang.startsWith('zh-TW')) && !isMale(v)
    );
    if (anyZhTwNonMale) return anyZhTwNonMale;

    // Any Chinese voice
    return list.find((v) => isChinese(v));
  }

  /**
   * Find Cantonese female voice
   */
  private findCantoneseVoice(): SpeechSynthesisVoice | undefined {
    const list = this.getVoicesList();
    if (list.length === 0) return undefined;

    const isHk = (v: SpeechSynthesisVoice) =>
      v.lang.includes('HK') || v.lang.includes('yue');

    const isMale = (v: SpeechSynthesisVoice) =>
      /(male|man|男|danny|wanlung|yun)/i.test(v.name);

    // Prefer female Cantonese
    const femaleHk = list.find(
      (v) => isHk(v) && !isMale(v) && /(female|woman|女|sin-?ji|hiugaai|hiumaan|tracy)/i.test(v.name)
    );
    if (femaleHk) return femaleHk;

    const anyHkNonMale = list.find((v) => isHk(v) && !isMale(v));
    if (anyHkNonMale) return anyHkNonMale;

    return list.find((v) => isHk(v));
  }

  /**
   * Preprocess text for natural educational reading
   */
  private cleanTextForSpeech(raw: string): string {
    return raw
      .replace(/_{2,}/g, '空格') // Replace blanks like "___" with "空格"
      .replace(/\*{1,2}([^*]+)\*{1,2}/g, '$1') // Strip markdown bold/italic
      .replace(/[【】]/g, ' ') // Strip brackets
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Speak text using Web Speech API with standard Mandarin female voice or Cantonese
  speakText(text: string, customDialect?: 'mandarin' | 'cantonese') {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();

      const cleaned = this.cleanTextForSpeech(text);
      if (!cleaned) return;

      const utterance = new SpeechSynthesisUtterance(cleaned);
      const dialectToUse = customDialect || this.dialect;

      if (dialectToUse === 'cantonese') {
        utterance.lang = 'zh-HK';
        utterance.rate = 0.92;
        utterance.pitch = 1.08;
        const voice = this.findCantoneseVoice();
        if (voice) utterance.voice = voice;
      } else {
        // Standard Mandarin female voice
        utterance.lang = 'zh-CN';
        // Rate: gentle, steady teacher pace for elementary school
        utterance.rate = 0.90;
        // Pitch: 1.15 produces a crisp, bright, gentle female teacher timbre
        utterance.pitch = 1.15;

        const femaleVoice = this.findMandarinFemaleVoice();
        if (femaleVoice) {
          utterance.voice = femaleVoice;
          if (femaleVoice.lang) utterance.lang = femaleVoice.lang;
        }
      }

      // Keep utterance in memory to prevent Chrome GC mid-speech
      this.currentUtterance = utterance;
      utterance.onend = () => {
        this.currentUtterance = null;
      };
      utterance.onerror = () => {
        this.currentUtterance = null;
      };

      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      window.speechSynthesis.speak(utterance);
    } catch {}
  }

  stopSpeaking() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
    } catch {}
  }
}

export const sound = new SoundSystem();
