import { ActionButton } from "@/components/actionButton";

import { ShareMazeButton } from "@/components/navBar/ShareMazeButton";
import { GameMode } from "@/features/maze/types";
import { MazeData } from "@/lib/maze/types";
import { HistoryControls } from "./historyControls";



interface ToolBarProps {
    gameMode: GameMode;
    setGameMode: (mode: GameMode) => void;
    handleUndo: () => void;
    handleRedo: () => void;
    showPath: boolean;
    cols: number;
    setShowPath: (show: boolean) => void;
    handleExportToPDF: (data: MazeData, cols: number) => void;
    mazeData: MazeData | null;
    canUndo: boolean;
    canRedo: boolean;

}

export const ToolBar = ({
    cols,
    showPath,
    setShowPath,
    handleExportToPDF,
    mazeData,
    handleUndo,
    handleRedo,
    canRedo,
    canUndo
}: ToolBarProps) => {

    return (
        <div className="flex flex-col md:flex-row md:items-center text-xs font-mono uppercase tracking-wider gap-5 relative" >
            <div className="flex gap-1 md:gap-4">

                <ShareMazeButton
                    mazeData={mazeData}
                    className="w-full md:w-auto !justify-start text-left normal-case"
                />
                <ActionButton
                    color="slate"
                    variant="text"
                    disabled={!mazeData}
                    onClick={() => {
                        setShowPath(!showPath);
                    }}
                    className="w-full md:w-auto !justify-start text-left normal-case"
                >
                    {showPath ? "Hide_Path" : "Show_Path"}
                </ActionButton>
                <ActionButton
                    color="slate"
                    variant="text"
                    disabled={!mazeData}
                    onClick={() => handleExportToPDF(mazeData!, cols)}
                    className="w-full md:w-auto !justify-start text-left normal-case"
                >
                    Export_PDF
                </ActionButton>
            </div>

            {mazeData && (
                <div className="w-full md:w-auto flex justify-center md:block">
                    <HistoryControls
                        canUndo={canUndo}
                        canRedo={canRedo}
                        onUndo={() => handleUndo()}
                        onRedo={() => handleRedo()}
                    />
                </div>
            )}
        </div>
    )
}