import { ButtonHTMLAttributes, ReactNode } from "react";
import {
  themeColors,
  IcolorVariants,
  IsizeVariants,
  sizeVariants,
} from "./themes";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: IcolorVariants;
  size?: IsizeVariants;
  children: ReactNode;
}

export const IconButton = ({
  color = "slate",
  size = "md",
  children,
  className = "",
  ...props
}: IconButtonProps) => {
  return (
    <button
      {...props}
      className={`rounded-full transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center ${sizeVariants[size]} ${themeColors[color].bg} rounded-5 ${className}`}
    >
      {children}
    </button>
  );
};
