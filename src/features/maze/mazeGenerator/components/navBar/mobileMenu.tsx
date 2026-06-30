import { ActionButton } from "@/components/actionButton";
import { ShareMazeButton } from "@/components/navBar/ShareMazeButton";
import { NAV_CLASSES } from "@/components/navBar/styles";
import { DifficultyBadge } from "@/features/mazeDifficulty/difficultyBadge";
import { AlgorithmSelector } from "./algorithmSelector";
import { SizeControls } from "./sizeControls";
import { NavbarProps } from "./types";


interface MobileMenuProps extends NavbarProps {
  total?: number
}
export const MobileMenu = ({
  algorithm,
  setAlgorithm,
  rows,
  setRows,
  cols,
  setCols,
  handleGenerate,
  showPath,
  setShowPath,
  handleExportToPDF,
  mazeData,
  total
}: MobileMenuProps) => {
  return (
    <div
      className={`md:hidden transition-all duration-200 ease-in-out  opacity-100 `}
    >
      <div className={NAV_CLASSES.mobileContainer}>
        <AlgorithmSelector
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          className="flex-col gap-1"
        />

        <SizeControls
          rows={rows}
          setRows={setRows}
          cols={cols}
          setCols={setCols}
          isMobile
        />
        <ActionButton color="orange" variant="text" onClick={handleGenerate}>
          [Generate Maze]
        </ActionButton>

        <div className="border-t border-slate-700 w-full"></div>

        <div className="flex flex-row gap-3 items-center">
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
          <ShareMazeButton mazeData={mazeData} />
        </div>
        {total && (
          <div className="sm:hidden w-full flex justify-center pb-2 border-t border-slate-700 pt-2">
            <DifficultyBadge score={total} />
          </div>
        )}

      </div>
    </div>
  );
};
