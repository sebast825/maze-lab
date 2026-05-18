"use client";
import { Maze, Position } from "@/lib/maze/types";
import { drawMaze, ThemeDraw } from "./drawMaze";
import { useRef, useEffect } from "react";

interface MazeCanvasProps {
  maze: Maze;
  cellSize: number;
  path?: Position[];
  showPath: boolean;
  start: Position;
  end: Position;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

export const MazeCanvas = ({
  maze,
  cellSize,
  start,
  end,
  showPath,
  path,
  onCanvasReady,
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
    drawMaze(ctx, maze, cellSize, start, end, showPath, ThemeDraw.NEON,path);
  }, [maze, cellSize, start, end, showPath, path]); // Redraws strictly when data changes
  return (
    <canvas
      ref={canvasRef}
      width={maze.cols * cellSize}
      height={maze.rows * cellSize}
      style={{ border: "1px solid black" }}
    />
  );
};
