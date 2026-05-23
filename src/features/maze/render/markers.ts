
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
  bgColor?: string;
}

export const drawMazeMarker = ({
  ctx,
  label,
  col,
  row,
  cellWidth,
  cellHeight,
  radius,
  color,
  shadowBlur = 0,
  bgColor,
}: DrawMarkerProps) => {
  // Calculate the top-left corner coordinates of the cell for the background
  const startX = col * cellWidth;
  const startY = row * cellHeight;

  // Calculate the center coordinates for both the circle and the text label
  const x = startX + cellWidth / 2;
  const y = startY + cellHeight / 2;

  // 1. Draw the rounded cell background if a color is provided
  if (bgColor) {
    ctx.save();
    ctx.beginPath(); // Isolate path to prevent rendering artifacts between markers
    ctx.fillStyle = bgColor;
    ctx.roundRect(startX, startY, cellWidth, cellHeight, 8);
    ctx.fill();
    ctx.restore();
  }

  // 2. Render the outer indicator circle with optional neon effects
  ctx.save();
  if (shadowBlur > 0) {
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = color;
  }

  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // 3. Draw the centered typography label
  ctx.fillStyle = color;
  ctx.fillText(label, x, y);
};