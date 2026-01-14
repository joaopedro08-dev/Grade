"use client"

import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import Header from "@/components/app/header";
import Main from "@/components/app/main";
import Footer from "@/components/app/footer";
import { StatsModal } from "@/components/stats-modal";
import { useKeyboard } from "@/hooks/use-keyboard";
import { getLetterStatus, LetterStatus } from "@/lib/utils";
import { VALID_WORDS } from "@/constants/words";
import { getDailyWords } from "@/lib/words";
import { getGameState, saveGameState } from "@/lib/storage";
import { motion } from "framer-motion";
import { bodyVariants } from "@/constants/animates";

export default function Page() {
    const [mode, setMode] = useState<1 | 2 | 4>(1);
    const [secretWords] = useState(() => getDailyWords(4));
    const [guesses, setGuesses] = useState<string[]>([]);
    const [currentGuess, setCurrentGuess] = useState("");
    const [invalidWord, setInvalidWord] = useState(false);
    const [isStatsOpen, setIsStatsOpen] = useState(false);
    const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");

    const activeSecrets = useMemo(() => secretWords.slice(0, mode), [mode, secretWords]);

    useEffect(() => {
        const saved = getGameState(mode);
        if (saved) {
            setGuesses(saved.guesses);
            setGameStatus(saved.status);
            if (saved.status !== "playing") {
                setTimeout(() => setIsStatsOpen(true), 500);
            }
        } else {
            setGuesses([]);
            setGameStatus("playing");
            setIsStatsOpen(false);
        }
    }, [mode]);

    const getUsedLetters = () => {
        const statusMap: Record<string, LetterStatus[]> = {};
        guesses.forEach((guess) => {
            guess.split("").forEach((char, index) => {
                const statuses = activeSecrets.map(secret => getLetterStatus(char, index, secret));
                if (!statusMap[char]) {
                    statusMap[char] = statuses;
                } else {
                    statusMap[char] = statuses.map((newStat, i) => {
                        const oldStat = statusMap[char][i];
                        if (oldStat === "correct") return "correct";
                        if (oldStat === "misplaced" && newStat !== "correct") return "misplaced";
                        return newStat;
                    });
                }
            });
        });
        return statusMap;
    };

    const handleInput = (key: string) => {
        if (gameStatus !== "playing") return;
        const maxGuesses = mode === 1 ? 6 : mode === 2 ? 9 : 13;

        if (key === "ENTER") {
            if (currentGuess.length < 5) {
                toast.error("Palavra incompleta");
                setInvalidWord(true);
                setTimeout(() => setInvalidWord(false), 500);
                return;
            }
            if (!VALID_WORDS.includes(currentGuess)) {
                toast.warning("Essa palavra não é válida");
                setInvalidWord(true);
                setTimeout(() => setInvalidWord(false), 500);
                return;
            }

            const newGuesses = [...guesses, currentGuess];
            setGuesses(newGuesses);
            setCurrentGuess("");

            const win = activeSecrets.every(s => newGuesses.includes(s));
            if (win || newGuesses.length >= maxGuesses) {
                const finalStatus = win ? "won" : "lost";
                setGameStatus(finalStatus);
                saveGameState(mode, { status: finalStatus, guesses: newGuesses });
                setTimeout(() => setIsStatsOpen(true), 1500);
                if (win) {
                    toast.success("Você venceu!");
                } else {
                    const remaining = activeSecrets.filter(s => !newGuesses.includes(s));
                    toast.error("Fim de jogo", {
                        description: `As palavras eram: ${remaining.join(", ")}`,
                        duration: 5000,
                    });
                }
            }
        } else if (key === "BACKSPACE") {
            setCurrentGuess((prev) => prev.slice(0, -1));
        } else if (currentGuess.length < 5 && /^[a-zA-Z]$/.test(key)) {
            setCurrentGuess((prev) => (prev + key).toUpperCase());
        }
    };

    useKeyboard(handleInput);

    return (
        <motion.div 
            variants={bodyVariants} 
            initial="hidden" 
            animate="visible" 
            className="game-container min-h-screen bg-background text-foreground"
        >
            <Header onModeChange={setMode} />
            <Main 
                mode={mode} 
                guesses={guesses} 
                currentGuess={currentGuess} 
                secretWords={activeSecrets} 
                invalidWord={invalidWord} 
            />
            <Footer onVirtualKey={handleInput} usedLetters={getUsedLetters()} />
            <StatsModal 
                isOpen={isStatsOpen} 
                onClose={() => setIsStatsOpen(false)} 
                status={gameStatus === "won" ? "won" : "lost"} 
                guesses={guesses.length} 
                mode={mode} 
            />
        </motion.div>
    );
}