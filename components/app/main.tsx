"use client"

import { mainVariants } from "@/constants/animates";
import { GridCell } from "./grid-cell";
import { getLetterStatus } from "@/lib/utils";
import { motion } from "framer-motion";

interface MainProps {
  mode: 1 | 2 | 4;
  guesses: string[];
  currentGuess: string;
  secretWords: string[];
  invalidWord: boolean;
}

export default function Main({ mode, guesses, currentGuess, secretWords, invalidWord }: MainProps) {
  const maxGuesses = mode === 1 ? 6 : mode === 2 ? 8 : 10;

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={mainVariants}
      className="flex-1 w-full overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
        <div
          className={`
            grid gap-6 sm:gap-8 md:gap-10 lg:gap-12 mx-auto justify-center items-start
            ${mode === 1 ? "grid-cols-1 max-w-md" : ""}
            ${mode === 2 ? "grid-cols-1 sm:grid-cols-2 max-w-4xl gap-x-8 lg:gap-x-16" : ""}
            ${mode === 4 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl gap-x-6 lg:gap-x-10" : ""}
          `}
        >
          {secretWords.map((secret, gridIndex) => {
            const isSolved = guesses.includes(secret);
            const solvedAt = isSolved ? guesses.indexOf(secret) : -1;

            return (
              <div
                key={gridIndex}
                className={`
                  flex flex-col gap-2 sm:gap-3 mx-auto
                  ${mode === 1 ? "w-full max-w-80" : ""}
                  ${mode === 2 ? "w-full max-w-70" : ""}
                  ${mode === 4 ? "w-full max-w-65 lg:max-w-170" : ""}
                  p-4 sm:p-5 rounded-xl bg-secondary/5 border border-secondary/30 transition-all duration-300
                  ${isSolved ? "opacity-60 scale-[0.98]" : ""}
                `}
              >
                {[...Array(maxGuesses)].map((_, rowIndex) => {
                  const isPastRow = rowIndex < guesses.length;
                  const isCurrentRow = rowIndex === guesses.length;
                  const isLocked = isSolved && rowIndex > solvedAt;
                  const word = isPastRow ? guesses[rowIndex] : isCurrentRow && !isSolved ? currentGuess : "";
                  const chars = word.split("");

                  return (
                    <div
                      key={rowIndex}
                      className={`grid grid-cols-5 gap-1.5 sm:gap-2 ${isCurrentRow && invalidWord ? "animate-shake" : ""} ${isLocked ? "invisible" : "visible"}`}
                    >
                      {[...Array(5)].map((_, colIndex) => {
                        const char = chars[colIndex] || "";
                        const status = (isPastRow || (isSolved && rowIndex === solvedAt)) ? getLetterStatus(char, colIndex, secret) : "none";
                        return <GridCell key={colIndex} char={char} status={status} delay={colIndex * 100} mode={mode} />;
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </motion.main>
  );
}