import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { NAV_CLASSES } from "./styles";
import { ActionButton } from "../actionButton";
import { useClickOutside } from "@/hooks/useClickOutside";

interface SizeControlsProps {
  rows: number;
  setRows: (rows: number) => void;
  cols: number;
  setCols: (cols: number) => void;
  isMobile?: boolean;
}

export const SizeControls = ({
  rows,
  setRows,
  cols,
  setCols,
  isMobile = false,
}: SizeControlsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const sizeControlMenuRef = useClickOutside<HTMLDivElement>(() => {
    if (isOpen) setIsOpen(false);
  });

  if (isMobile) {
    return (
      <div className="flex gap-4  py-3 w-full justify-center">
        <div className="flex items-center gap-1">
          <span className="text-slate-400">Rows:</span>
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value) || 0)}
            min={5}
            max={50}
            className={NAV_CLASSES.inputNumberMobile}
          />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-slate-400">Cols:</span>
          <input
            type="number"
            value={cols}
            onChange={(e) => setCols(parseInt(e.target.value) || 0)}
            min={5}
            max={50}
            className={NAV_CLASSES.inputNumberMobile}
          />
        </div>
      </div>
    );
  }

  return (
    <div ref={sizeControlMenuRef} className="relative">
      <ActionButton
        color={isOpen ? "green" : "slate"}
        variant="text"
        onClick={() => setIsOpen(!isOpen)}
      >
        Size ({rows}x{cols})
        <ChevronDown className="w-3 h-3 opacity-60" />
      </ActionButton>

      {isOpen && (
        <div
          className={`${NAV_CLASSES.dropdownContainer} p-3 flex flex-col gap-3 min-w-[140px]`}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-slate-300 text-[12px]">Rows:</span>
            <input
              type="number"
              value={rows}
              onChange={(e) => setRows(parseInt(e.target.value) || 0)}
              min={5}
              max={50}
              className={NAV_CLASSES.inputNumber}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-slate-300 text-[12px]">Cols:</span>
            <input
              type="number"
              value={cols}
              onChange={(e) => setCols(parseInt(e.target.value) || 0)}
              min={5}
              max={50}
              className={NAV_CLASSES.inputNumber}
            />
          </div>
        </div>
      )}
    </div>
  );
};
