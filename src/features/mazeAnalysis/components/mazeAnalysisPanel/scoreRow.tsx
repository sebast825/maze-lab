import { format } from "./helpers";

interface ScoreRowProps {
  label: string;
  value: number;
  highlight?: boolean;
}

export function ScoreRow({ label, value, highlight = false }: ScoreRowProps) {
  return (
    <div
      className={`flex justify-between py-2 gap-4 ${
        highlight ? "mt-3 border-t border-slate-700 pt-4 font-bold text-lg" : ""
      }`}
    >
      <span className="text-white">{label}</span>

      <span className={highlight ? "text-green-400" : "text-green-300"}>
        {format(value)}
      </span>
    </div>
  );
}
