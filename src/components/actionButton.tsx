interface ActionButtonProps {
  action: () => void;
  disable?: boolean;
  text: string;
  color: string;
}

export const ActionButton = ({
  action,
  disable = false,
  text,
  color,
}: ActionButtonProps) => {
  return (
    <button
      onClick={action}
      disabled={disable}
      className={`px-4 py-2 bg-${color}-600 text-white font-medium rounded-md hover:bg-${color}-600 transition disabled:opacity-40 disabled:hover:bg-${color}-600 disabled:cursor-not-allowed`}
    >
      {text}
    </button>
  );
};
