import jsPDF from "jspdf";
import { MazeData } from "@/lib/maze/types";
import { drawMaze } from "../render/drawMaze";
import { ThemeDraw } from "../render/types";

export const useCanvasPDF = () => {
  const handleExportToPDF = (mazeData: MazeData, cols: number) => {
    try {
      const canvasRef = drawMazePrint(mazeData);
      exportToPDF(cols, canvasRef);
    } catch (error) {
      console.error("Error handling PDF export:", error);
    }
  };

  const drawMazePrint = (mazeData: MazeData): HTMLCanvasElement => {
    // Correct way to instantiate an in-memory canvas
    const canvas = document.createElement("canvas");
    
    const { maze, start, end, solution } = mazeData;
    const CELL_SIZE = 25;

    // Set absolute internal resolution based on data before drawing
    canvas.width = maze.cols * CELL_SIZE;
    canvas.height = maze.rows * CELL_SIZE;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to get 2D context from headless canvas");
    }

    // Force a clear frame (good practice, though initialization starts clean)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Trigger the rendering pipeline cleanly
    drawMaze(
      ctx,
      maze,
      CELL_SIZE,
      start,
      end,
      true, 
      ThemeDraw.PRINT,
      solution || []
    );

    return canvas;
  };

  const exportToPDF = (cols: number, canvasElement: HTMLCanvasElement) => {
    try {
      const imgData = canvasElement.toDataURL("image/png");
      const isLandscape = canvasElement.width > canvasElement.height;

      const MAX_WIDTH = isLandscape ? 277 : 190;
      const MAX_HEIGHT = isLandscape ? 190 : 270;

      let imgWidth = (cols * 90) / 20;
      let imgHeight = (canvasElement.height * imgWidth) / canvasElement.width;

      if (imgWidth > MAX_WIDTH) {
        imgWidth = MAX_WIDTH;
        imgHeight = (canvasElement.height * imgWidth) / canvasElement.width;
      }

      if (imgHeight > MAX_HEIGHT) {
        imgHeight = MAX_HEIGHT;
        imgWidth = (canvasElement.width * imgHeight) / canvasElement.height;
      }

      const pdf = new jsPDF({
        orientation: isLandscape ? "landscape" : "portrait",
        unit: "mm",
        format: "a4",
      });

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

      const blob = pdf.output("blob");
      const blobURL = URL.createObjectURL(blob);
      window.open(blobURL, "_blank");
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  return {
    handleExportToPDF
  };
};