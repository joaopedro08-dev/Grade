export const getGameState = (mode: number) => {
  if (typeof window === "undefined") return null;
  const today = new Date().toISOString().slice(0, 10);
  const saved = localStorage.getItem(`game_state_${mode}_${today}`);
  return saved ? JSON.parse(saved) : null;
};

export const saveGameState = (mode: number, state: any) => {
  if (typeof window === "undefined") return;
  const today = new Date().toISOString().slice(0, 10);
  localStorage.setItem(`game_state_${mode}_${today}`, JSON.stringify(state));
};