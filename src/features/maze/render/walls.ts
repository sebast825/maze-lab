import { Cell } from "@/lib/maze/types";
import { ThemeDraw, ThemeDrawType } from "./types";

interface DrawMazeProps {
  ctx: CanvasRenderingContext2D;
  cells: Cell[][];
  rows: number;
  cols: number;
  cellSize: number;
  theme: ThemeDrawType;
  neonColor?: string;
  coreColor?: string;
}

export const drawMazeWalls = ({
  ctx,
  cells,
  rows,
  cols,
  cellSize,
  neonColor = "#06b6d4",
  coreColor = "#e0f2fe",
  theme,
}: DrawMazeProps) => {
  const traceWalls = () => {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cell = cells[row][col];
        const x = col * cellSize;
        const y = row * cellSize;

        if (cell.walls.north) {
          ctx.moveTo(x, y);
          ctx.lineTo(x + cellSize, y);
        }
        if (cell.walls.south) {
          ctx.moveTo(x, y + cellSize);
          ctx.lineTo(x + cellSize, y + cellSize);
        }
        if (cell.walls.east) {
          ctx.moveTo(x + cellSize, y);
          ctx.lineTo(x + cellSize, y + cellSize);
        }
        if (cell.walls.west) {
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + cellSize);
        }
        /*
        if (cell.isHead) {
          ctx.fillStyle = "rgba(255, 0, 0, 0.35)";
          ctx.fillRect(x, y, cellSize, cellSize);
        }*/
        if (cell.startPoint) {
          ctx.fillStyle = "rgba(0, 255, 0, .09)";
          ctx.fillRect(x, y, cellSize, cellSize);
        }
        if (cell.groupId !== undefined) {
          // Generate deterministic color from id
          const hue = (cell.groupId * 47) % 360;
          ctx.fillStyle = `hsla(${hue}, 70%, 50%, 0.35)`;
          ctx.fillRect(x, y, cellSize, cellSize);
        }
      }
    }
  };

  // STEP 1: Draw the outer glow

  ctx.save();
  ctx.beginPath();
  traceWalls();

  ctx.strokeStyle = neonColor;
  if (theme == ThemeDraw.NEON) {
    ctx.shadowBlur = 8; // High blur for the neon dispersion
  }
  ctx.lineWidth = 4; // Thicker line for the outer aura
  ctx.shadowColor = neonColor;
  ctx.lineCap = "round"; // Makes wall joints look smoother
  ctx.stroke();
  ctx.restore();

  // STEP 2: Draw the bright center

  ctx.save();
  ctx.beginPath();
  traceWalls();

  ctx.strokeStyle = coreColor;
  ctx.lineWidth = 1.5; // Thin line for the inner electric tube
  ctx.lineCap = "round";
  ctx.stroke(); // Drawn without shadows for maximum sharpness
  ctx.restore();
};
