import { Position } from "@/lib/maze/types";

export const drawAllPaths = (
  ctx: CanvasRenderingContext2D,
  paths: Position[][],
  cellSize: number,
) => {
  paths.forEach((path) => {
    ctx.beginPath();

    const firstX = path[0].col * cellSize + cellSize / 2;
    const firstY = path[0].row * cellSize + cellSize / 2;
    ctx.moveTo(firstX, firstY);

    for (let i = 1; i < path.length; i++) {
      const nextX = path[i].col * cellSize + cellSize / 2;
      const nextY = path[i].row * cellSize + cellSize / 2;
      ctx.lineTo(nextX, nextY);
    }
    ctx.lineWidth = Math.max(2, cellSize * 0.15);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = "#f43f5e";
    ctx.shadowColor = "#f43f5e";
    ctx.stroke();
  });
};
