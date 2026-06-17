import { ButtonHTMLAttributes, ReactNode } from "react";
import { themeColors, IcolorVariants } from "./themes";

type ButtonVariant = "text" | "outline" | "solid";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: IcolorVariants;
  variant?: ButtonVariant;
  children?: ReactNode;
}

const getVariantStyles = (
  variant: ButtonVariant,
  color: IcolorVariants,
): string => {
  const styles: Record<ButtonVariant, string> = {
    text: `${themeColors[color].text} hover:underline bg-transparent`,
    outline: `px-3 py-1.5 rounded border transition-all ${themeColors[color].border} ${themeColors[color].text}`,
    solid: `px-3 py-1.5 rounded transition-all ${themeColors[color].bg} font-semibold`,
  };
  return styles[variant];
};
export const ActionButton = ({
  color = "white",
  variant = "outline",
  children,
  className = "",
  ...props
}: ActionButtonProps) => {
  return (
    <button
      {...props}
      className={`font-mono text-xs uppercase tracking-wider cursor-pointer 
  disabled:opacity-30 disabled:no-underline disabled:cursor-not-allowed
  ${getVariantStyles(variant, color)} ${className}`}
    >
      <div className="flex items-center gap-2 justify-center">{children}</div>
    </button>
  );
};
