import { ReactNode } from "react";
interface ActionButtonProps {
  action: () => void;
  disable?: boolean;
  text?: string;
  children?: ReactNode;
  color: string;
}

export const ActionButton = ({
  action,
  disable = false,
  text,
  color,
  children,
}: ActionButtonProps) => {
  return (
    <button
      onClick={action}
      disabled={disable}
      className={`px-4 py-2 bg-${color}-600 text-white font-medium rounded-md hover:bg-${color}-700 cursor-pointer transition disabled:opacity-40  disabled:cursor-not-allowed`}
    >
      <div className="flex display-row items-center gap-2 ">
        {children}

        {text && <span>{text}</span>}
      </div>
    </button>
  );
};
