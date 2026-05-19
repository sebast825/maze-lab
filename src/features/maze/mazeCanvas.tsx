"use client";

import { MazeData, Position } from "@/lib/maze/types";
import { drawMaze, ThemeDraw } from "./render/drawMaze";
import { useRef, useEffect } from "react";
import { GameMode } from "@/app/page";
import { useGameCharacter } from "./useGameCharacter";
import { useBreadCrumbs } from "./useBreadCrumbs";
import { drawBreadcrumbs, drawCharacter } from "./render/drawCharacter";

interface MazeCanvasProps {
  mazeData: MazeData;
  cellSize: number;
  showPath: boolean;
  gameMode: GameMode;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

export const MazeCanvas = ({
  mazeData,
  cellSize,
  showPath,
  gameMode,
  onCanvasReady,
}: MazeCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const rows = mazeData.maze.rows;
  const cols = mazeData.maze.cols;

  const { position } = useGameCharacter({
    grid: mazeData.maze.cells,
    totalRows: rows,
    totalCols: cols,
    isGameMode: gameMode === "CHARACTER",
    initialPosition: mazeData.start,
  });

  const visitedCells = useBreadCrumbs({ position, mazeData });

  const currentX = useRef<number | null>(null);
  const currentY = useRef<number | null>(null);

  useEffect(() => {
    if (canvasRef.current && onCanvasReady) {
      onCanvasReady(canvasRef.current);
    }
  }, [onCanvasReady]);

  // Main rendering and animation loop hook
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cellWidth = canvas.width / cols;
    const cellHeight = canvas.height / rows;

    const targetX = position.col * cellWidth;
    const targetY = position.row * cellHeight;

    // Fallback initial assignment on first mount instance
    if (currentX.current === null || currentY.current === null) {
      currentX.current = targetX;
      currentY.current = targetY;
    }

    let animationFrameId: number;

    const renderLoop = () => {
      // Easing calculation to smoothly transition positions
      const ease = 0.2;
      currentX.current! += (targetX - currentX.current!) * ease;
      currentY.current! += (targetY - currentY.current!) * ease;

      // ================================================================
      // LAYER 1: Core Maze Infrastructure Rendering
      // ================================================================
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawMaze(
        ctx,
        mazeData.maze,
        cellSize,
        mazeData.start,
        mazeData.end!,
        showPath,
        ThemeDraw.NEON,
        mazeData.solution || undefined
      );

      // ================================================================
      // LAYER 2: Game Elements (Active strictly in CHARACTER mode)
      // ================================================================
      if (gameMode === "CHARACTER") {
        drawBreadcrumbs({
          ctx,
          visitedCells: visitedCells.current,
          cellWidth,
          cellHeight,
        });

        drawCharacter({
          ctx,
          currentX: currentX.current!,
          currentY: currentY.current!,
          cellWidth,
          cellHeight,
        });
      }

      // Continue animation loop if character has not reached target position threshold
      if (Math.abs(targetX - currentX.current!) > 0.05 || Math.abs(targetY - currentY.current!) > 0.05) {
        animationFrameId = requestAnimationFrame(renderLoop);
      } else {
        currentX.current = targetX;
        currentY.current = targetY;
      }
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mazeData, cellSize, showPath, gameMode, position, rows, cols]);

  return (
    <canvas
      ref={canvasRef}
      width={cols * cellSize}
      height={rows * cellSize}
      className={"block"}
/>);
};