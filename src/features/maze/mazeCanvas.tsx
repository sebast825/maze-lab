"use client";
import { Maze, Position } from "@/lib/maze/types";
import { useEffect, useRef } from "react";

interface MazeCanvasProps {
  maze: Maze;
  cellSize: number;
  path?: Position[];
  start: Position;
  end: Position;
}

export const MazeCanvas = ({
  maze,
  cellSize,
  start,
  end,
  path,
}: MazeCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawMaze(ctx, maze, cellSize, start, end, path);
  }, [maze, cellSize, path]);

  return (
    <canvas
      ref={canvasRef}
      width={maze.cols * cellSize}
      height={maze.rows * cellSize}
      style={{ border: "1px solid black" }}
    />
  );
};

function drawMaze(
  ctx: CanvasRenderingContext2D,
  maze: Maze,
  cellSize: number,
  start: Position,
  end: Position,
  path?: Position[],
) {
  const { rows, cols, cells } = maze;

  // Clear canvas
  ctx.clearRect(0, 0, cols * cellSize, rows * cellSize);

  // Draw background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, cols * cellSize, rows * cellSize);

  // Draw path first (so walls are drawn on top)
  if (path && path.length > 0) {
    ctx.fillStyle = "rgba(0, 255, 0, 0.4)";
    for (const cell of path) {
      ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
    }
  }

  // Draw walls
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 2;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = cells[row][col];
      const x = col * cellSize;
      const y = row * cellSize;

      // North wall
      if (cell.walls.north) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + cellSize, y);
        ctx.stroke();
      }

      // South wall
      if (cell.walls.south) {
        ctx.beginPath();
        ctx.moveTo(x, y + cellSize);
        ctx.lineTo(x + cellSize, y + cellSize);
        ctx.stroke();
      }

      // East wall
      if (cell.walls.east) {
        ctx.beginPath();
        ctx.moveTo(x + cellSize, y);
        ctx.lineTo(x + cellSize, y + cellSize);
        ctx.stroke();
      }

      // West wall
      if (cell.walls.west) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + cellSize);
        ctx.stroke();
      }
    }
  }

  //end point
  ctx.fillStyle = "#00f";
  ctx.fillRect(end.x * cellSize, end.y * cellSize, cellSize, cellSize);

  //start point
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(
    start.x * cellSize,
    start.y * cellSize,
    cellSize / 2,
    cellSize / 2,
  );
}
