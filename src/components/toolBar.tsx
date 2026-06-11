import { ReactNode } from "react";

interface ToolBarProps {
  children: ReactNode;
}

export const ToolBar = ({ children }: ToolBarProps) => {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-4 p-4 bg-gray-800 rounded-lg shadow-md">
      {" "}
      {children}
    </div>
  );
};
