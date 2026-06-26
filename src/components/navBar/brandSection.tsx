import { DifficultyBadge } from "@/features/mazeDifficulty/difficultyBadge";

interface BrandSectionProps {
  total?: number;
}

export const BrandSection = ({ total }: BrandSectionProps) => {
  return (
    <div className="flex items-center space-x-4 flex-shrink-0">
      <div className="font-bold text-lg tracking-wider text-slate-200">
        MAZE<span className="text-indigo-500">.</span>
      </div>
      {total && (
        <div className="hidden sm:block scale-90 origin-left">
          <DifficultyBadge score={total} />
        </div>
      )}
    </div>
  );
};