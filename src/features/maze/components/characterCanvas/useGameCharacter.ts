import { Cell, Position } from "@/lib/maze/types";
import { useState, useEffect, useCallback } from "react";

interface UseGameCharacterProps {
  grid: Cell[][];
  totalRows: number;
  totalCols: number;
  isGameMode: boolean;
  initialPosition: Position;
}

export const useGameCharacter = ({
  grid,
  totalRows,
  totalCols,
  isGameMode,
  initialPosition,
}: UseGameCharacterProps) => {
  const [position, setPosition] = useState<Position>(initialPosition);

  // Resetear a la posición inicial cuando se apaga/enciende el modo juego
  useEffect(() => {
    if (isGameMode && initialPosition) {
      setPosition(initialPosition);
    }
  }, [isGameMode, initialPosition]);

  const moveCharacter = useCallback(
    (direction: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
      if (!grid || grid.length === 0) return;

      setPosition((prev) => {
        const currentCell = grid[prev.row]?.[prev.col];
        if (!currentCell) return prev;

        const { north, east, south, west } = currentCell.walls;

        switch (direction) {
          case "UP":
            if (!north && prev.row > 0) return { ...prev, row: prev.row - 1 };
            break;
          case "DOWN":
            if (!south && prev.row < totalRows - 1)
              return { ...prev, row: prev.row + 1 };
            break;
          case "LEFT":
            if (!west && prev.col > 0) return { ...prev, col: prev.col - 1 };
            break;
          case "RIGHT":
            if (!east && prev.col < totalCols - 1)
              return { ...prev, col: prev.col + 1 };
            break;
        }
        return prev;
      });
    },
    [grid, totalRows, totalCols],
  );

  useEffect(() => {
    if (!isGameMode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "w" || e.key === "ArrowUp") moveCharacter("UP");
      if (key === "s" || e.key === "ArrowDown") moveCharacter("DOWN");
      if (key === "a" || e.key === "ArrowLeft") moveCharacter("LEFT");
      if (key === "d" || e.key === "ArrowRight") moveCharacter("RIGHT");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGameMode, moveCharacter]);

  return { position,moveCharacter };
};
