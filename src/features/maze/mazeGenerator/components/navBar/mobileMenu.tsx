import { ActionButton } from "@/components/actionButton";
import { NAV_CLASSES } from "@/components/navBar/styles";
import { AlgorithmSelector } from "./algorithmSelector";
import { SizeControls } from "./sizeControls";
import { NavbarProps } from "./types";
import { MenuActionsMobile } from "@/features/maze/mazeEditor/components/menu/mobile";


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

        <span className="border-t border-slate-700 w-full"></span>

        <MenuActionsMobile mazeData={mazeData} showPath={showPath} setShowPath={setShowPath}
          cols={cols} total={total}   ></MenuActionsMobile>

      </div>
    </div>
  );
};
