"use client";
import { Maze, Position } from "@/lib/maze/types";

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
  const handleCanvasRef = (canvas: HTMLCanvasElement | null) => {

    if (!canvas) return;

    if (onCanvasReady) {
      onCanvasReady(canvas);
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawMaze(ctx, maze, cellSize, start, end, showPath, path);
  };
  return (
    <canvas
      ref={handleCanvasRef}
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
  showPath: boolean,
  path?: Position[],
) {
  const { rows, cols, cells } = maze;

  // Clear canvas
  ctx.clearRect(0, 0, cols * cellSize, rows * cellSize);

  // Draw background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, cols * cellSize, rows * cellSize);

  // Draw path first (so walls are drawn on top)
  if (showPath && path && path.length > 0) {
    ctx.fillStyle = "rgba(0, 255, 0, 0.4)";

    for (const cell of path) {
      ctx.fillRect(
        cell.col * cellSize,
        cell.row * cellSize,
        cellSize,
        cellSize,
      );
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
const cellWidth = cellSize;
const cellHeight = cellSize;



const radius = Math.min(cellWidth, cellHeight) / 2.5; // Responsive radius based on cell size


// Configure global typography styles once
ctx.font = "bold 14px sans-serif"; 
ctx.textAlign = "center";
ctx.textBaseline = "middle"; 

// 1. Render Start point ('S')
drawMazeMarker({
  ctx,
  label: "S",
  col: start.col,
  row: start.row,
  cellWidth,
  cellHeight,
  radius,
  color: "#ef4444", // Tailwind Red-500
  shadowBlur: 10,
});

// 2. Render End point ('E')
drawMazeMarker({
  ctx,
  label: "E",
  col: end.col,
  row: end.row,
  cellWidth,
  cellHeight,
  radius,
  color: "#3b82f6", // Tailwind Blue-500
  shadowBlur: 1,
});
}


interface DrawMarkerProps {
  ctx: CanvasRenderingContext2D;
  label: "S" | "E";
  col: number;
  row: number;
  cellWidth: number;
  cellHeight: number;
  radius: number;
  color: string;
  shadowBlur?: number;
}

// Reusable helper to draw map markers (Start/End points) with optional neon glow
const drawMazeMarker = ({
  ctx,
  label,
  col,
  row,
  cellWidth,
  cellHeight,
  radius,
  color,
  shadowBlur = 0,
}: DrawMarkerProps) => {
  const x = col * cellWidth + cellWidth / 2;
  const y = row * cellHeight + cellHeight / 2;

  ctx.save(); // Save context state to isolate shadow effects

  // Apply shadow if a blur value is provided
  if (shadowBlur > 0) {
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = color;
  }

  // Draw outer indicator circle
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore(); // Restore context to prevent shadow leakage onto the text

  // Draw centered typography label
  ctx.fillStyle = color;
  ctx.fillText(label, x, y);
};