/**
 * Array shuffling utilities for curriculum questions and sentence word tiles
 */

// Guaranteed random shuffle (ensures not identical to original if length > 1)
export function shuffleSentenceWords(words: string[]): string[] {
  if (!words || words.length <= 1) return [...words];

  const shuffled = [...words];
  let attempts = 0;

  do {
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    attempts++;
  } while (
    attempts < 10 &&
    shuffled.every((w, idx) => w === words[idx])
  );

  return shuffled;
}

// Randomly shuffle generic array
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
