"use client"

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);
      const diff = tomorrow.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft("00:00:00");
        return;
      }
      const h = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
      const s = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
      setTimeLeft(`${h}:${m}:${s}`);
      setLoading(false);
    };
    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading) return <Loader2 className="h-5 w-5 animate-spin opacity-50" />;
  return <span className="text-2xl font-black tabular-nums">{timeLeft}</span>;
}