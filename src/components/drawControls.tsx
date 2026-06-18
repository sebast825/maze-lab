

import { Undo2, Trash2 } from "lucide-react";
import { ActionButton } from "./actionButton";

interface DrawControlsProps {
  onUndo: () => void;
  onClear: () => void;
  className?: string;
}

export const DrawControls = ({ 
  onUndo, 
  onClear, 
  className = "text-slate-500" 
}: DrawControlsProps) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <ActionButton
        color="slate"
        variant="outline"
        onClick={onUndo}
        title="Undo"
      >
        <Undo2 className="w-3.5 h-3.5" />
      </ActionButton>
      
      <ActionButton
        color="slate"
        variant="outline"
        onClick={onClear}
        title="Clear"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </ActionButton>
    </div>
  );
};