import { useEffect } from "react";

export function useKeyboard(onKeyPress: (key: string) => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, ctrlKey, metaKey } = event;

      if (ctrlKey || metaKey) return;

      if (key === "Enter") {
        onKeyPress("ENTER");
      } else if (key === "Backspace") {
        onKeyPress("BACKSPACE");
      } else if (/^[a-zA-Z]$/.test(key)) {
        onKeyPress(key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onKeyPress]);
}