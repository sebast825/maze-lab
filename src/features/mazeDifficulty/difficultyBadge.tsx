import {
  DifficultyCategory,
  difficultyUI,
  getDifficulty,
} from "./getDifficulty";

type Props = {
  score: number;
};

export function DifficultyBadge({ score }: Props) {
  const category: DifficultyCategory = getDifficulty(score);
  const { label, color } = difficultyUI[category];

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontWeight: 700,
        textTransform: "uppercase",
        borderRadius: "8px",
        backgroundColor: color,
        padding: "10px 10px",
      }}
    >
      <span>
        Difficulty ·{" "}
        <span style={{ textTransform: "capitalize" }}>{label}</span>
      </span>
      <span>|</span>
      <span>
        Score ·{" "}
        <span style={{ textTransform: "capitalize" }}>{score.toFixed(2)}</span>
      </span>
    </div>
  );
}
