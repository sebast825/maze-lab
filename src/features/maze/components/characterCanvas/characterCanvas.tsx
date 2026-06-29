"use client";

import { useEffect, useRef } from "react";
import { MazeData } from "@/lib/maze/types";
import { useBreadCrumbs } from "./useBreadCrumbs";
import { useGameCharacter } from "./useGameCharacter";
import {
  animateCharacter,
  drawBreadcrumbs,
  drawCharacter,
} from "../../render/character";

interface CharacterCanvasProps {
  mazeData: MazeData;
  cellSize: number;
}

export const CharacterCanvas = ({
  mazeData,
  cellSize,
}: CharacterCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rows = mazeData.maze.rows;
  const cols = mazeData.maze.cols;

  const { position } = useGameCharacter({
    grid: mazeData.maze.cells,
    totalRows: rows,
    totalCols: cols,
    isGameMode: true,
    initialPosition: mazeData?.start!,
  });

  const visitedCells = useBreadCrumbs({ position, mazeData });

  const currentX = useRef<number | null>(null);
  const currentY = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const cellWidth = canvas.width / cols;
    const cellHeight = canvas.height / rows;
    const targetX = position.col * cellWidth;
    const targetY = position.row * cellHeight;

    return animateCharacter({
      ctx,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      cols,
      rows,
      targetX,
      targetY,
      currentX,
      currentY,
      onRender: (cWidth, cHeight, currX, currY) => {
        drawBreadcrumbs({
          ctx,
          visitedCells: visitedCells.current,
          cellWidth: cWidth,
          cellHeight: cHeight,
        });
        drawCharacter({
          ctx,
          currentX: currX,
          currentY: currY,
          cellWidth: cWidth,
          cellHeight: cHeight,
        });
      },
    });
  }, [position, rows, cols]);

  return (
    <canvas
      ref={canvasRef}
      width={mazeData.maze.cols * cellSize}
      height={mazeData.maze.rows * cellSize}
      className="absolute top-0 left-0 bg-transparent block"
    />
  );
};
