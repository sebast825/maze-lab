// ==================================================================
// GAME MODE RENDERING HELPERS
// ==================================================================

interface DrawCharacterProps {
  ctx: CanvasRenderingContext2D;
  currentX: number;
  currentY: number;
  cellWidth: number;
  cellHeight: number;
  color?: string;
}

/**
 * Renders the game character at its currently interpolated (animated) position.
 */
export const drawCharacter = ({
  ctx,
  currentX,
  currentY,
  cellWidth,
  cellHeight,
  color = "#ea580c",
}: DrawCharacterProps) => {
  const centerX = currentX + cellWidth / 2;
  const centerY = currentY + cellHeight / 2;
  
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(centerX, centerY, Math.min(cellWidth, cellHeight) / 2.5, 0, Math.PI * 2);
  ctx.fill();
};

interface DrawBreadcrumbsProps {
  ctx: CanvasRenderingContext2D;
  visitedCells: Set<string> | string[];
  cellWidth: number;
  cellHeight: number;
  color?: string;
}

/**
 * Renders the tracking history dots for all visited grid positions.
 */
export const drawBreadcrumbs = ({
  ctx,
  visitedCells,
  cellWidth,
  cellHeight,
  color = "#ea580c",
}: DrawBreadcrumbsProps) => {
  ctx.fillStyle = color;
  
  visitedCells.forEach((cellKey) => {
    const [rStr, cStr] = cellKey.split(",");
    const dotX = parseInt(cStr) * cellWidth + cellWidth / 2;
    const dotY = parseInt(rStr) * cellHeight + cellHeight / 2;
    
    ctx.beginPath();
    ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2);
    ctx.fill();
  });
};

interface AnimateArgs {
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  cols: number;
  rows: number;
  targetX: number;
  targetY: number;
  currentX: { current: number | null };
  currentY: { current: number | null };
  onRender: (cellWidth: number, cellHeight: number, x: number, y: number) => void;
}

export const animateCharacter = ({
  ctx,
  canvasWidth,
  canvasHeight,
  cols,
  rows,
  targetX,
  targetY,
  currentX,
  currentY,
  onRender,
}: AnimateArgs) => {
  if (currentX.current === null || currentY.current === null) {
    currentX.current = targetX;
    currentY.current = targetY;
  }

  let frameId: number;
  
  const cellWidth = canvasWidth / cols;
  const cellHeight = canvasHeight / rows;

  const loop = () => {
    currentX.current! += (targetX - currentX.current!) * 0.2;
    currentY.current! += (targetY - currentY.current!) * 0.2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    onRender(cellWidth, cellHeight, currentX.current!, currentY.current!);

    if (Math.abs(targetX - currentX.current!) > 0.05 || Math.abs(targetY - currentY.current!) > 0.05) {
      frameId = requestAnimationFrame(loop);
    } else {
      currentX.current = targetX;
      currentY.current = targetY;
    }
  };

  loop();
  return () => cancelAnimationFrame(frameId);
};