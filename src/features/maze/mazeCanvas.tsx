"use client";
import { MazeData } from "@/lib/maze/types";

import { useRef, useEffect } from "react";
import { drawMaze } from "./render/drawMaze";
import { ThemeDraw } from "./render/types";

interface MazeCanvasProps {
  mazeData: MazeData;
  cellSize: number;
  showPath: boolean;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

export const MazeCanvas = ({
  mazeData,
  onCanvasReady,
  cellSize,
  showPath,
}: MazeCanvasProps) => {
  // 1. Isolated reference for THIS specific canvas instance
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 2. Effect to notify the parent once the DOM node is mounted
  useEffect(() => {
    if (canvasRef.current && onCanvasReady) {
      onCanvasReady(canvasRef.current);
    }
  }, [onCanvasReady]); // Only runs when the callback identity changes (or on mount)

  // 3. Effect to handle drawing whenever state or props change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Trigger the rendering pipeline cleanly
    drawMaze(
      ctx,
      mazeData.maze,
      cellSize,
      mazeData.start,
      mazeData.end,
      showPath,
      ThemeDraw.NEON,
      mazeData.solution,
    );
  }, [
    mazeData.maze,
    cellSize,
    mazeData.start,
    mazeData.end,
    showPath,
    mazeData.solution,
  ]); // Redraws strictly when data changes
  return (
    <canvas
      ref={canvasRef}
      width={mazeData.maze.cols * cellSize}
      height={mazeData.maze.rows * cellSize}
    />
  );
};
