import { ActionButton } from "@/components/actionButton";
import { ActionDropdown } from "@/components/actionDropdown";
import { ShareMazeButton } from "@/components/navBar/ShareMazeButton";
import { ModeControls } from "@/features/maze/mazeGenerator/components/navBar/modeControls";
import { openMazeInEditor } from "./helpers";
import { useCanvasPDF } from "@/features/maze/hooks/useCanvasPDF";
import { MenuProps } from "./types";
import { GameMode } from "@/features/maze/types";

interface MenuActionsDesktopProps extends MenuProps {
    setGameMode: (mode: GameMode) => void;
    gameMode: GameMode;
    handleUndoDraw: () => void;
    handleClearDraw: () => void;
}

export const MenuActionsDesktop = ({
    mazeData,
    showPath,
    setShowPath,
    cols,
    gameMode,
    setGameMode,
    handleUndoDraw,
    handleClearDraw,
}: MenuActionsDesktopProps) => {
    const { handleExportToPDF } = useCanvasPDF();
    return (
        <>
            <ActionDropdown label="Actions">
                <ActionButton
                    color="slate"
                    variant="text"
                    disabled={!mazeData}
                    onClick={() => setShowPath(!showPath)}
                    className="w-full !justify-start text-left normal-case"
                >
                    {showPath ? "Hide_Path" : "Show_Path"}
                </ActionButton>

                <ActionButton
                    color="slate"
                    variant="text"
                    disabled={!mazeData}
                    onClick={() => handleExportToPDF(mazeData, cols)}
                    className="w-full !justify-start text-left normal-case"
                >
                    Export_PDF
                </ActionButton>

                <ActionButton
                    color="slate"
                    variant="text"
                    disabled={!mazeData}
                    onClick={() => openMazeInEditor(mazeData)}
                    className="w-full !justify-start text-left normal-case"
                >
                    Edit Maze
                </ActionButton>

                <ShareMazeButton mazeData={mazeData} className="w-full !justify-start text-left normal-case" />
            </ActionDropdown>

            {mazeData && (
                <ModeControls
                    gameMode={gameMode}
                    setGameMode={setGameMode}
                    onUndo={handleUndoDraw}
                    onClear={handleClearDraw}
                />
            )}
        </>
    );
};