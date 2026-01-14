"use client"

import { Delete } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { footerVariants } from "@/constants/animates";

interface FooterProps {
  onVirtualKey: (key: string) => void;
  usedLetters: Record<string, string[]>;
}

export default function Footer({ onVirtualKey, usedLetters }: FooterProps) {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "BACKSPACE"],
    ["Z", "X", "C", "V", "B", "N", "M", "ENTER"],
  ];

  return (
    <motion.footer 
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      className="w-full pb-6 pt-2 px-2 bg-background border-t"
    >
      <div className="mx-auto max-w-125 flex flex-col gap-1.5 lg:gap-2">
        {rows.map((row, i) => (
          <div key={i} className="flex justify-center gap-1 lg:gap-1.5">
            {row.map((key) => {
              const statuses = usedLetters[key] || [];
              
              if (key === "BACKSPACE") {
                return (
                  <Button 
                    key={key} 
                    variant="secondary" 
                    className="h-12 lg:h-14 flex-1 max-w-15 p-0 flex items-center justify-center" 
                    onClick={() => onVirtualKey("BACKSPACE")}
                  >
                    <Delete className="h-5 w-5" />
                  </Button>
                );
              }

              if (key === "ENTER") {
                return (
                  <Button 
                    key={key} 
                    variant="secondary" 
                    className="h-12 lg:h-14 px-4 lg:px-6 font-bold text-[10px] lg:text-sm flex items-center justify-center flex-[1.5]" 
                    onClick={() => onVirtualKey("ENTER")}
                  >
                    ENTER
                  </Button>
                );
              }

              return (
                <Button 
                  key={key} 
                  className="h-12 lg:h-14 flex-1 min-w-7.5 max-w-11.25 p-0 font-bold text-sm lg:text-base transition-colors relative overflow-hidden bg-secondary text-foreground border-none flex items-center justify-center" 
                  onClick={() => onVirtualKey(key)}
                >
                  <div className="absolute inset-0 flex">
                    {statuses.map((status, idx) => (
                      <div 
                        key={idx} 
                        className={`h-full flex-1 ${
                          status === "correct" 
                            ? "bg-green-600" 
                            : status === "misplaced" 
                            ? "bg-yellow-500" 
                            : status === "wrong" 
                            ? "bg-zinc-800/40" 
                            : "bg-transparent"
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="relative z-10">{key}</span>
                </Button>
              );
            })}
          </div>
        ))}
      </div>
    </motion.footer>
  );
}