import { MazeData } from "@/lib/maze/types";
import { useEffect, useRef } from "react";
import { useGameCharacter } from "./useGameCharacter";
import { useBreadCrumbs } from "./useBreadCrumbs";
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
    isGameMode: true,
    initialPosition: mazeData?.start!,
  });

  const visitedCells = useBreadCrumbs({ position, mazeData });

  const currentX = useRef<number | null>(null);
  const currentY = useRef<number | null>(null);

  const characterColor = "#ea580c";
  const dotColor = "#ea580c";

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const cellWidth = canvas.width / cols;
    const cellHeight = canvas.height / rows;
    const targetX = position.col * cellWidth;
    const targetY = position.row * cellHeight;

    if (currentX.current === null || currentY.current === null) {
      currentX.current = targetX;
      currentY.current = targetY;
    }

    let animationFrameId: number;

    const render = () => {
      const ease = 0.2;
      currentX.current! += (targetX - currentX.current!) * ease;
      currentY.current! += (targetY - currentY.current!) * ease;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Render tracking history
      ctx.fillStyle = dotColor;
      visitedCells.current.forEach((cellKey) => {
        const [rStr, cStr] = cellKey.split(",");
        const dotX = parseInt(cStr) * cellWidth + cellWidth / 2;
        const dotY = parseInt(rStr) * cellHeight + cellHeight / 2;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Render caracter
      const centerX = currentX.current! + cellWidth / 2;
      const centerY = currentY.current! + cellHeight / 2;
      ctx.fillStyle = characterColor;
      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.min(cellWidth, cellHeight) / 2.5, 0, Math.PI * 2);
      ctx.fill();

      if (Math.abs(targetX - currentX.current!) > 0.05 || Math.abs(targetY - currentY.current!) > 0.05) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        currentX.current = targetX;
        currentY.current = targetY;
      }
    };

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