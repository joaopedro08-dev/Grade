import { VALID_WORDS } from "@/constants/words";

export function getDailyWords(count: number = 4): string[] {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  const random = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  const selected: string[] = [];
  let i = 0;

  while (selected.length < count) {
    const r = random(seed + i);
    const index = Math.floor(r * VALID_WORDS.length);
    const word = VALID_WORDS[index];
    if (!selected.includes(word)) selected.push(word);
    i++;
  }
  return selected;
}