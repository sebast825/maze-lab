import { ReactNode } from "react";
import { colorVariants, sizeVariants } from "./themes";

interface IconButtonProps {
  action: () => void;
  disable?: boolean;
  color: keyof typeof colorVariants;
  children: ReactNode;
  size?: keyof typeof sizeVariants;
}

export const IconButton = ({
  action,
  disable = false,
  color,
  children,
  size = "md",
}: IconButtonProps) => {
  return (
    <button
      onClick={action}
      disabled={disable}
      className={`rounded-full transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center ${sizeVariants[size]} ${colorVariants[color]}`}
    >
      {children}
    </button>
  );
};
