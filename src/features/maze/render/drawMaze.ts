import { Maze, Position } from "@/lib/maze/types";
import { ThemeDraw, ThemeDrawType } from "./types";
import { drawMazeWalls } from "./walls";
import { drawMazeMarker } from "./markers";
import { drawAllPaths } from "./paths";



export function drawMaze(
  ctx: CanvasRenderingContext2D,
  maze: Maze,
  cellSize: number,
  start: Position,
  end: Position,
  showPath: boolean,
  theme: ThemeDrawType,
  path?: Position[][],
) {
  const { rows, cols, cells } = maze;

  // Clear canvas
  ctx.clearRect(0, 0, cols * cellSize, rows * cellSize);

  // Draw background
  ctx.fillStyle = ThemeDraw.NEON == theme ? "#010" : "#fff";
  ctx.fillRect(0, 0, cols * cellSize, rows * cellSize);

  // Draw path first (so walls are drawn on top)
  if (showPath && path && path.length > 0 && ThemeDraw.NEON == theme) {
    drawAllPaths(ctx, path, cellSize);
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
    color: ThemeDraw.NEON == theme ? "#eab308" : "#fff",
    bgColor: "#000",
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
    color: ThemeDraw.NEON == theme ? "#eab308" : "#fff",
    bgColor: "#000",
  });
}
