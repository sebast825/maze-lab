import { ReactNode } from "react";

interface IconButtonProps {
  action: () => void;
  disable?: boolean;
  color: string;
  children: ReactNode;
}

export const IconButton = ({
  action,
  disable = false,
  color,
  children,
}: IconButtonProps) => {
  return (
    <button
      onClick={action}
      disabled={disable}
      className={`p-4 bg-${color}-600 text-white rounded-full hover:bg-${color}-700 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center`}
    >
      {children}
    </button>
  );
};
