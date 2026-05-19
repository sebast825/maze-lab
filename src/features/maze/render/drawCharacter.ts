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