import { useState } from "react";

export const useDraw = ({ cellSize }: { cellSize: number }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<{ x: number; y: number }[][]>([]);
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>(
    [],
  );

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getMousePos(e);

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setCurrentPath([{ x, y }]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = e.currentTarget;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getMousePos(e);
    ctx.lineWidth = cellSize > 18 ? 4 : 2;

    ctx.lineCap = "round";
    ctx.strokeStyle = "#ef4444";

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    setCurrentPath((prev) => [...prev, { x, y }]);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentPath.length > 0) {
      setHistory((prev) => [...prev, currentPath]);
      setCurrentPath([]);
    }
  };

  const clearAll = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    setHistory([]);
  };

  const undoLast = (canvas: HTMLCanvasElement | null) => {
    if (!canvas || history.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const newHistory = history.slice(0, -1);
    setHistory(newHistory);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    newHistory.forEach((path) => {
      if (path.length === 0) return;
      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#ef4444";

      ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
      }
      ctx.stroke();
    });
  };

  return {
    startDrawing,
    draw,
    stopDrawing,
    undoLast,
    clearAll,
  };
};
