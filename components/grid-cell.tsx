"use client"

interface GridCellProps {
  char: string;
  status: "correct" | "misplaced" | "wrong" | "none";
  delay?: number;
  mode: 1 | 2 | 4;
}

export function GridCell({ char, status, delay = 0, mode }: GridCellProps) {
  const isRevealed = status !== "none";
  
  const sizeClasses = {
    1: "w-12 h-12 text-2xl",
    2: "w-10 h-10 text-xl",
    4: "w-8 h-8 sm:w-10 sm:h-10 text-lg"
  }[mode];

  return (
    <div
      style={{ animationDelay: isRevealed ? `${delay}ms` : "0ms" }}
      className={`
        ${sizeClasses} flex items-center justify-center font-black uppercase rounded-sm border-2 transition-all
        ${isRevealed ? "animate-flip border-transparent text-white" : "border-muted"}
        ${!isRevealed && char ? "border-foreground scale-105" : ""}
        ${status === "correct" ? "bg-green-600" : ""}
        ${status === "misplaced" ? "bg-yellow-500" : ""}
        ${status === "wrong" ? "bg-zinc-700" : ""}
      `}
    >
      {char}
    </div>
  );
}