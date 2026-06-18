import { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";
import { NAV_CLASSES } from "./navBar/styles";
import { ActionButton } from "./actionButton";
import { useClickOutside } from "@/hooks/useClickOutside";

interface ActionDropdownProps {
  label: string;
  children: ReactNode;
  color?: "indigo" | "slate";
  onOpenChange?: (isOpen: boolean) => void;
}

export const ActionDropdown = ({
  label,
  children,
  color = "slate",
  onOpenChange,
}: ActionDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const controlMenuRef = useClickOutside<HTMLDivElement>(() => {
    if (isOpen) setIsOpen(false);
  });
  const toggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState);
  };

  return (
    <div ref={controlMenuRef} className="relative">
      <ActionButton
        color={isOpen ? "green" : color}
        variant="text"
        onClick={toggle}
      >
        {label}
        <ChevronDown className="w-3 h-3 opacity-60" />
      </ActionButton>

      {isOpen && (
        <div
          className={`${NAV_CLASSES.dropdownContainer} py-2 px-3 flex flex-col gap-2 min-w-[130px] items-start`}
        >
          {children}
        </div>
      )}
    </div>
  );
};
