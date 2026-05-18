import { MazeData, Position } from "@/lib/maze/types";
import { useEffect, useRef } from "react";
import { useGameCharacter } from "./useGameCharacter";

interface GameCanvasProps {
  mazeData: MazeData;
}

export const GameCanvas = ({ mazeData }: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rows = mazeData.maze.rows;
  const cols = mazeData.maze.cols;
  const { position } = useGameCharacter({
    grid: mazeData.maze.cells,
    totalRows: rows,
    totalCols: cols,
    isGameMode: true, // O la variable de estado que uses (ej: isGameMode)
    initialPosition: mazeData?.start!,
  });
  // Track current visual coordinates in pixels to persist between animations without triggering React re-renders
  const currentX = useRef<number | null>(null);
  const currentY = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const cellWidth = canvas.width / cols;
    const cellHeight = canvas.height / rows;

    // 1. Calculate target position in pixels
    const targetX = position.col * cellWidth;
    const targetY = position.row * cellHeight;

    // Snap character to origin on initial render without transition
    if (currentX.current === null || currentY.current === null) {
      currentX.current = targetX;
      currentY.current = targetY;
    }

    let animationFrameId: number;

    // 2. 60fps animation loop for smooth movement
    const render = () => {
      // Smoothing factor (0.1 = slow/smooth, 0.3 = fast, 1 = instant)
      const ease = 0.2;

      // LERP formula: current = current + (target - current) * speed
      currentX.current! += (targetX - currentX.current!) * ease;
      currentY.current! += (targetY - currentY.current!) * ease;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw character using interpolated visual coordinates
      ctx.fillStyle = "#ea580c"; // orange-600
      const padding = 4;

      ctx.fillRect(
        currentX.current! + padding,
        currentY.current! + padding,
        cellWidth - padding * 2,
        cellHeight - padding * 2,
      );

      const distanceX = Math.abs(targetX - currentX.current!);
      const distanceY = Math.abs(targetY - currentY.current!);

      // Check tolerance threshold to stop the animation loop
      if (distanceX > 0.05 || distanceY > 0.05) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        // Snap to exact target to prevent micro-drifting
        currentX.current = targetX;
        currentY.current = targetY;
      }
    };

    // Trigger animation on logical position change
    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [position, rows, cols]);

  return (
    <canvas
      ref={canvasRef}
      width={cols * 25} 
      height={rows * 25}
      className="absolute inset-0 pointer-events-none" 
    />
  );
};
