import { useState } from "react";
import jsPDF from "jspdf";

export const useCanvasPDF = () => {
  const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(
    null,
  );
  const exportToPDF = (cols: number) => {
    if (!canvasElement) return;

    try {
      const imgData = canvasElement.toDataURL("image/png");

      const isLandscape = canvasElement.width > canvasElement.height;

      // Define dynamic maximum limits based on orientation (subtracting proportional margins)
      const MAX_WIDTH = isLandscape ? 277 : 190; // 297 - 20mm or 210 - 20mm
      const MAX_HEIGHT = isLandscape ? 190 : 270; // 210 - 20mm or 297 - 27mm

      // Calculate the initial theoretical width based on the proportional rule
      let imgWidth = (cols * 90) / 20;
      let imgHeight = (canvasElement.height * imgWidth) / canvasElement.width;

      // Adjust by maximum width if it exceeds the limit
      if (imgWidth > MAX_WIDTH) {
        imgWidth = MAX_WIDTH;
        imgHeight = (canvasElement.height * imgWidth) / canvasElement.width;
      }

      // Adjust by maximum height if it exceeds the limit
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

      // Converts the generated PDF document in memory into a raw binary file (Blob).
      const blob = pdf.output("blob");
      // Creates a unique, indexed URL that points directly to that specific block of memory in the browser.
      const blobURL = URL.createObjectURL(blob);
      window.open(blobURL, "_blank");
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  return {
    setCanvasElement,
    exportToPDF,
    hasCanvas: !!canvasElement,
  };
};
