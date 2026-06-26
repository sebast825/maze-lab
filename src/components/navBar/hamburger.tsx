interface HamburgerProps {
  isOpen: boolean;
  toggle: () => void;
}

export const Hamburger = ({ isOpen, toggle }: HamburgerProps) => {
  return (
    <button
      onClick={toggle}
      type="button"
      className="inline-flex items-center justify-center p-2 text-slate-400 hover:text-slate-200 focus:outline-none transition-colors"
    >
      <span className="sr-only">Open Menu</span>
      <div className="w-5 h-3.5 flex flex-col justify-between relative">
        <span
          className={`w-full h-[1.5px] bg-current rounded transition-all duration-200 ${
            isOpen ? "rotate-45 translate-y-[6px]" : ""
          }`}
        />
        <span
          className={`w-full h-[1.5px] bg-current rounded transition-all duration-150 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`w-full h-[1.5px] bg-current rounded transition-all duration-200 ${
            isOpen ? "-rotate-45 -translate-y-[6px]" : ""
          }`}
        />
      </div>
    </button>
  );
};
