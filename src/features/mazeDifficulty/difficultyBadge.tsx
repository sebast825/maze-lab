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
    <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase text-slate-400 select-none text-[12px] md:text-[15px]">
      <span style={{ color: color }} className="font-bold">
        ●
      </span>

      <span>
        DIFF:{" "}
        <span style={{ color: color }} className="text-slate-200 font-semibold">
          {label}
        </span>
      </span>

      <span className="text-slate-800">|</span>

      <span>
        SCORE:{" "}
        <span className="text-slate-200 font-semibold">{score.toFixed(2)}</span>
      </span>
    </div>
  );
}
