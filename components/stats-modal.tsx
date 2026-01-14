"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
import { Countdown } from "./countdown"
import { Button } from "./ui/button";

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: "won" | "lost";
  guesses: number;
  mode: number;
}

export function StatsModal({ isOpen, onClose, status, guesses, mode }: StatsModalProps) {
  const share = () => {
    const text = `Joguei Grade #${mode} (${guesses} tent.) 🧩`;
    navigator.clipboard.writeText(text);
    toast.success("Copiado para a área de transferência!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card text-foreground border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-black uppercase tracking-tighter">
            {status === "won" ? "Espetacular!" : "Fim de Jogo"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-6 py-4">
          <div className="flex gap-12 text-center">
            <div>
              <div className="text-4xl font-black">{guesses}</div>
              <div className="text-[10px] uppercase font-bold opacity-70 tracking-widest">Tentativas</div>
            </div>
            <div>
              <div className="text-4xl font-black">{mode}</div>
              <div className="text-[10px] uppercase font-bold opacity-70 tracking-widest">Grades</div>
            </div>
          </div>

          <div className="w-full space-y-4">
            <Button 
              onClick={share} 
              className="w-full rounded-md font-black uppercase text-sm transition-all active:scale-95 shadow-lg"
            >
              Compartilhar
            </Button>
          </div>

          <div className="flex flex-col items-center border-t border-white/10 pt-4 w-full">
            <p className="text-[10px] uppercase font-bold opacity-60 tracking-widest mb-1">
              Próxima Grade em
            </p>
            <Countdown />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}