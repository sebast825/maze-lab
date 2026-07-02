import { DifficultyBadge } from "@/features/mazeDifficulty/difficultyBadge";
import { useNavigation } from "@/hooks/useNavigation";

interface BrandSectionProps {
  total?: number;
}

export const BrandSection = ({ total }: BrandSectionProps) => {
  const { goToHome } = useNavigation()
  return (
    <div className="flex items-center space-x-4 flex-shrink-0">
      <button
        onClick={goToHome}
        className="font-bold text-lg tracking-wider text-slate-200 cursor-pointer hover:text-slate-100 transition-colors select-none bg-transparent p-0 border-none text-left appearance-none"
      >
        MAZE<span className="text-indigo-500">.</span>
      </button>
      {Number.isFinite(total) && total && (
        <div className="hidden sm:block scale-90 origin-left">
          <DifficultyBadge score={total} />
        </div>
      )}
    </div>
  );
};