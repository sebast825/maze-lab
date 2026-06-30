import { ActionButton } from "@/components/actionButton";
import { ShareMazeButton } from "@/components/navBar/ShareMazeButton";
import { NAV_CLASSES } from "@/components/navBar/styles";
import { DifficultyBadge } from "@/features/mazeDifficulty/difficultyBadge";
import { useNavigation } from "@/hooks/useNavigation";
import { NavbarProps } from "./types";


interface MobileMenuProps extends NavbarProps {
  total?: number;

}
export const MobileMenu = ({
  cols,
  showPath,
  setShowPath,
  handleExportToPDF,
  mazeData,
  total
}: MobileMenuProps) => {
  const { goToHome } = useNavigation()

  return (
    <div
      className={`md:hidden transition-all duration-200 ease-in-out  opacity-100 `}
    >
      <div className={NAV_CLASSES.mobileContainer}>
        <ActionButton color="orange" variant="text" onClick={() => goToHome()}>
          [Generate]
        </ActionButton>
        <div className="flex flex-col gap-3 items-center">
          <ActionButton
            color="slate"
            variant="text"
            disabled={!mazeData}
            onClick={() => setShowPath(!showPath)}
          >
            {showPath ? "Hide Path" : "Show Path"}
          </ActionButton>
          <ActionButton
            color="slate"
            variant="text"
            disabled={!mazeData}
            onClick={() => handleExportToPDF(mazeData!, cols)}
          >
            Export PDF
          </ActionButton>
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
