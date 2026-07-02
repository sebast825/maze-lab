import { useEffect, useState } from "react";

type UseCellSizeParams = {
  rows: number;
  cols: number;
  maxCellSize?: number;
  maxWidthRatio?: number;
  maxHeightRatio?: number;
};

export function useCellSize({
  rows,
  cols,
  maxCellSize = 25,
  maxWidthRatio = 0.95,
  maxHeightRatio = 0.85,
}: UseCellSizeParams) {
  const [cellSize, setCellSize] = useState(maxCellSize);

  useEffect(() => {
    const updateCellSize = () => {
      const maxWidth = window.innerWidth * maxWidthRatio;
      const maxHeight = window.innerHeight * maxHeightRatio;

      const size = Math.min(
        maxCellSize,
        maxWidth / cols,
        maxHeight / rows,
      );

      setCellSize(size);
    };

    updateCellSize();

    window.addEventListener("resize", updateCellSize);

    return () => {
      window.removeEventListener("resize", updateCellSize);
    };
  }, [rows, cols, maxCellSize, maxWidthRatio, maxHeightRatio]);

  return cellSize;
}