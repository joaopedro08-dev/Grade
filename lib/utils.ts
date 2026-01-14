import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type LetterStatus = "correct" | "misplaced" | "wrong" | "none";

export function getLetterStatus(char: string, index: number, secret: string): LetterStatus {
  if (!secret.includes(char)) return "wrong";
  if (secret[index] === char) return "correct";
  return "misplaced";
}