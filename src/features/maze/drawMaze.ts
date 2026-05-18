import { Maze, Position } from "@/lib/maze/types";

export const ThemeDraw = {
  NEON: "neon",
  PRINT: "print",
} as const;

export type ThemeDrawType = (typeof ThemeDraw)[keyof typeof ThemeDraw];

export function drawMaze(
  ctx: CanvasRenderingContext2D,
  maze: Maze,
  cellSize: number,
  start: Position,
  end: Position,
  showPath: boolean,
  theme: ThemeDrawType,
  path?: Position[],
) {
  const { rows, cols, cells } = maze;

  // Clear canvas
  ctx.clearRect(0, 0, cols * cellSize, rows * cellSize);

  // Draw background
  ctx.fillStyle = ThemeDraw.NEON == theme ? "#010" : "#fff";
  ctx.fillRect(0, 0, cols * cellSize, rows * cellSize);

  // Draw path first (so walls are drawn on top)
  if (showPath && path && path.length > 0 && ThemeDraw.NEON == theme) {
    drawPath(ctx, path, cellSize);
  }
  drawMazeWalls({
    ctx,
    cells,
    rows,
    cols,
    cellSize, // Size of each cell in px
    theme,
    neonColor: ThemeDraw.NEON == theme ? "#06b6d4" : "#000",
    coreColor: ThemeDraw.NEON == theme ? "#ebbebe" : "",
  });
  const cellWidth = cellSize;
  const cellHeight = cellSize;
  const radius = Math.min(cellWidth, cellHeight) / 2.5; // Responsive radius based on cell size
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const fontSize = Math.floor(cellHeight * 0.6);
  ctx.font = `bold ${fontSize}px sans-serif`;
  // 1. Render Start point ('S')
  drawMazeMarker({
    ctx,
    label: "S",
    col: start.col,
    row: start.row,
    cellWidth,
    cellHeight,
    radius,
    color: ThemeDraw.NEON == theme ? "#eab308" : "#000",
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
    color: ThemeDraw.NEON == theme ? "#eab308" : "#000",
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

interface DrawMazeProps {
  ctx: CanvasRenderingContext2D;
  cells: any[][]; // Replace with your specific Cell type
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

const drawPath = (
  ctx: CanvasRenderingContext2D,
  path: Position[],
  cellSize: number,
) => {
  ctx.save();

  // 1. Setup minimal neon line styling
  ctx.strokeStyle = "#f43f5e";
  ctx.shadowColor = "#f43f5e";
  ctx.lineWidth = Math.max(2, cellSize * 0.15);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  // 2. Add an elegant soft glow
  ctx.shadowBlur = 8;
  ctx.beginPath();

  // 3. Move to the center of the first cell in the path
  const firstX = path[0].col * cellSize + cellSize / 2;
  const firstY = path[0].row * cellSize + cellSize / 2;
  ctx.moveTo(firstX, firstY);

  // 4. Connect dots through the center of all remaining cells (Batching)
  for (let i = 1; i < path.length; i++) {
    const nextX = path[i].col * cellSize + cellSize / 2;
    const nextY = path[i].row * cellSize + cellSize / 2;
    ctx.lineTo(nextX, nextY);
  }

  // 5. Single draw call for maximum performance
  ctx.stroke();
  ctx.restore();
};
