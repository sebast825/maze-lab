import { ReactNode } from "react";

interface IconButtonProps {
  action: () => void;
  disable?: boolean;
color: "orange" | "red" | "slate" | "rose" | "blue";
  children: ReactNode;
  size?: "sm" | "md";
}

export const IconButton = ({
  action,
  disable = false,
  color,
  children,
  size = "md"
}: IconButtonProps) => {
   const colorVariants = {
    orange: "bg-orange-600 hover:bg-orange-700 text-white",
    red: "bg-red-600 hover:bg-red-700 text-white",
    slate: "bg-slate-600 hover:bg-slate-700 text-white",
    rose: "bg-rose-600 hover:bg-rose-700 text-white",
    blue: "bg-blue-600 hover:bg-blue-700 text-white",
  };
  const sizeVariants = {
    sm: "p-2.5", 
    md: "p-4",   
  };
  return (
    <button
      onClick={action}
      disabled={disable}
className={`text-white rounded-full transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center ${sizeVariants[size]} ${colorVariants[color]}`}>      {children}
    </button>
  );
};
