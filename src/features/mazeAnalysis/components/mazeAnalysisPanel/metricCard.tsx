import { format } from "./helpers";

interface MetricCardProps {
  title: string;
  data: object;
}

export function MetricCard({ title, data }: MetricCardProps) {
  return (
    <div className="w-full md:w-[240px]  rounded-lg border border-slate-700 bg-slate-800 p-4">
      <h4 className="mb-4 text-lg font-semibold text-white">{title}</h4>

      <div className="space-y-2">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between text-sm">
            <span className="text-slate-300 pr-2">{key}</span>

            <span className="font-mono text-white">{format(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
