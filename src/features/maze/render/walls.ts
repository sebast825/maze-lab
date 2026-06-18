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

  const mazePath = new Path2D();

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = cells[row][col];
      const x = col * cellSize;
      const y = row * cellSize;

      if (cell.walls.north) {
        mazePath.moveTo(x, y);
        mazePath.lineTo(x + cellSize, y);
      }
      if (cell.walls.south) {
        mazePath.moveTo(x, y + cellSize);
        mazePath.lineTo(x + cellSize, y + cellSize);
      }
      if (cell.walls.east) {
        mazePath.moveTo(x + cellSize, y);
        mazePath.lineTo(x + cellSize, y + cellSize);
      }
      if (cell.walls.west) {
        mazePath.moveTo(x, y);
        mazePath.lineTo(x, y + cellSize);
      }
   /*
      const color = getCellBackground(cell);
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, cellSize, cellSize);
      }*/
    }
  }

  // Dynamic scaling configuration
  const outerWidth = Math.max(1, cellSize * 0.15);
  const innerWidth = Math.max(0.5, cellSize * 0.05);
  const blurValue = Math.max(2, cellSize * 0.35);

  // STEP 1: Draw the outer glow
  ctx.save();
  ctx.strokeStyle = neonColor;
  if (theme === ThemeDraw.NEON) {
    ctx.shadowBlur = blurValue;
  }
  ctx.lineWidth = outerWidth;
  ctx.shadowColor = neonColor;
  ctx.lineCap = "round";
  ctx.stroke(mazePath);
  ctx.restore();

  // STEP 2: Draw the bright center
  ctx.save();
  ctx.strokeStyle = coreColor;
  ctx.lineWidth = innerWidth;
  ctx.lineCap = "round";
  ctx.stroke(mazePath); 
  ctx.restore();
};

//for debuggin purpose show wich kind of cells are and why have been modify
const getCellBackground = (cell: Cell): string | null => {
  if (cell.startPoint) return "rgba(0, 255, 0, .09)";
  if (cell.isBackBone) return "rgba(219, 243, 113, 0.15)";

  if (cell.groupId !== undefined) {
    const hue = (cell.groupId * 47) % 360;
    return `hsla(${hue}, 70%, 50%, 0.35)`;
  }

  const reasonColors: Record<string, string> = {
    isIntersection: "rgba(255, 72, 255, 0.35)",
    branchDistance: "rgba(255, 0, 0, 0.35)",
    backboneDepth: "rgba(0, 100, 255, 0.35)",
    intersectionPenalty: "rgba(255, 200, 0, 0.35)",
  };

  return cell.loopReason ? reasonColors[cell.loopReason] || null : null;
};
