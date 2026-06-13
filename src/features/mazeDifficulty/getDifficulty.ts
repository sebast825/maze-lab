import { difficultyStats } from "./difficultyStats";

export type DifficultyCategory = "very_easy" | "easy" | "medium" | "hard" | "expert";

export const difficultyUI: Record<
  DifficultyCategory,
  { label: string; color: string }
> = {
  very_easy: { label: "Very Easy", color: "#0dd" },
  easy: { label: "Easy", color: "#0c0 " },
  medium: { label: "Medium", color: "#eab308" },
  hard: { label: "Hard", color: "#f97316" },
  expert: { label: "Expert", color: "#f00" },
};
export const getDifficulty = (score: number): DifficultyCategory => {
  const s = difficultyStats;

  if (score < s.p5) return "very_easy";
  if (score < s.p25) return "easy";
  if (score < s.p75) return "medium";
  if (score < s.p95) return "hard";
  return "expert";
};
