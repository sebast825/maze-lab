import { algorithmLabels } from "@/features/maze/constants";
import { AlgorithmType } from "@/lib/alogirthms/generation";
import { NAV_CLASSES } from "./styles";

interface AlgorithmSelectorProps {
  algorithm: AlgorithmType;
  setAlgorithm: (alg: AlgorithmType) => void;
  onGenerate: () => void;
  className?: string;
}

export const AlgorithmSelector = ({
  algorithm,
  setAlgorithm,
  onGenerate,
  className = "",
}: AlgorithmSelectorProps) => {
  return (
    <div className={`flex items-center gap-2 text-slate-400 ${className}`}>
      <span className="text-slate-400 text-[10px]">Algorithm:</span>
      <select
        value={algorithm}
        onChange={(e) => {
          setAlgorithm(e.target.value as AlgorithmType);
          onGenerate();
        }}
        className={NAV_CLASSES.select}
      >
        {Object.entries(algorithmLabels).map(([key, label]) => (
          <option key={key} value={key} className="bg-slate-950 text-slate-200">
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
