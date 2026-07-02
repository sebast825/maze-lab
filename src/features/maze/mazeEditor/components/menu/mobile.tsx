import { ActionButton } from "@/components/actionButton";
import { ActionDropdown } from "@/components/actionDropdown";
import { ShareMazeButton } from "@/components/navBar/ShareMazeButton";
import { ModeControls } from "@/features/maze/mazeGenerator/components/navBar/modeControls";
import { GameMode } from "@/features/maze/types";
import { openMazeInEditor } from "./helpers";
import { useCanvasPDF } from "@/features/maze/hooks/useCanvasPDF";
import { DifficultyBadge } from "@/features/mazeDifficulty/difficultyBadge";
import { MenuProps } from "./types";

interface MenuActionsMobileProps extends MenuProps {
    total?: number
}

export const MenuActionsMobile = ({
    mazeData,
    showPath,
    setShowPath,
    cols,
    total
}: MenuActionsMobileProps) => {
    const { handleExportToPDF } = useCanvasPDF();
    return (
        <>
            <div className="flex flex-row gap-3 items-center justify-center">
                <ActionButton
                    color="slate"
                    variant="text"
                    disabled={!mazeData}
                    onClick={() => setShowPath(!showPath)}
                >
                    {showPath ? "Hide Path" : "Show Path"}
                </ActionButton>
                <span>|</span>
                <ActionButton
                    color="slate"
                    variant="text"
                    disabled={!mazeData}
                    onClick={() => handleExportToPDF(mazeData!, cols)}
                >
                    Export PDF
                </ActionButton>
                <span>|</span>
                <ActionButton
                    color="slate"
                    variant="text"
                    disabled={!mazeData}
                    onClick={() => openMazeInEditor(mazeData!)}

                >
                    Edit Maze
                </ActionButton>
                <span>|</span>
                <ShareMazeButton mazeData={mazeData} />
            </div>
            {total && (
                <div className="sm:hidden w-full flex justify-center pb-2 border-t border-slate-700 pt-2">
                    <DifficultyBadge score={total} />
                </div>
            )}
        </>
    );
};