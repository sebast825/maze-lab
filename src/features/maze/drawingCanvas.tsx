import { RefObject } from "react";

interface DrawingCanvasProps {
  cols: number;
  rows: number;
  drawingCanvasRef: RefObject<HTMLCanvasElement | null>;
  startDrawing: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  draw: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  stopDrawing: () => void;
}

export const DrawingCanvas = ({
  cols,
  rows,
  drawingCanvasRef,
  startDrawing,
  draw,
  stopDrawing,
}: DrawingCanvasProps) => {
  return (
    <canvas
      ref={drawingCanvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      width={cols * 25}
      height={rows * 25}
      className="absolute top-0 left-0 bg-transparent cursor-crosshair"
    />
  );
};
