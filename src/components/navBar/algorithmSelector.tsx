import { algorithmLabels } from "@/features/maze/constants";
import { AlgorithmType } from "@/lib/alogirthms/generation";
import { NAV_CLASSES } from "./styles";
import { Info } from "lucide-react";
import { MAZE_GENERATION_UI_INFO } from "@/lib/alogirthms/generation/description";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useState } from "react";
import { themeColors } from "../themes";

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
  const [isOpen, setIsOpen] = useState(false);

  const ref = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  return (
    <div className={`flex items-center gap-2 text-slate-400 ${className}`}>
      <span className="text-slate-400 text-[10px]">Algorithm:</span>

      <div className="flex flex-row gap-3 ">
        <select
          value={algorithm}
          onChange={(e) => {
            setAlgorithm(e.target.value as AlgorithmType);          
            setIsOpen(false);
          }}
          className={`${NAV_CLASSES.select} border-b-2 border-slate-500`}
        >
          {Object.entries(algorithmLabels).map(([key, label]) => (
            <option
              key={key}
              value={key}
              className="bg-slate-950 text-slate-200"
            >
              {label}
            </option>
          ))}
        </select>

        {/* Info icon */}
        <div className="relative flex items-center visual-bubble" ref={ref}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className={`cursor-pointer transition-colors focus:outline-none ${themeColors.slate.text}`}
          >
            <Info className="h-4 w-4 pointer" />
          </button>

          <div
            className={`absolute top-full right-0 mt-2 w-64 p-3 
              bg-slate-900 text-slate-200 rounded border border-slate-700 
              shadow-xl transition-all duration-150 z-50
                        ${
                          isOpen
                            ? "opacity-100 scale-100 pointer-events-auto"
                            : "opacity-0 scale-95 pointer-events-none"
                        }`}
          >
            <div className="flex flex-col gap-1 layout-content">
              <span
                className={` font-semibold text-xs  ${themeColors.orange.text}`}
              >
                {MAZE_GENERATION_UI_INFO[algorithm].name}
              </span>
              <p className="text-[11px] text-slate-200 leading-relaxed whitespace-pre-line">
                {MAZE_GENERATION_UI_INFO[algorithm].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
