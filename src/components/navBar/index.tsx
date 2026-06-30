import { useState } from "react";
import { BrandSection } from "./brandSection";
import { Hamburger } from "./hamburger";
import { useClickOutside } from "@/hooks/useClickOutside";
import { ReactNode } from "react";

export interface NavbarProps {
  total: number | undefined;
  desktopMenu: ReactNode;
  mobileMenu: ReactNode;
}
export function Navbar({ total, desktopMenu, mobileMenu }: NavbarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const ref = useClickOutside<HTMLDivElement>(() => {
    setIsMobileOpen(false);
  });

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed top-16 left-0 right-0 bottom-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <nav className="w-full bg-slate-950 text-white border-b border-slate-900 sticky top-0 z-50 backdrop-blur-md bg-opacity-95 select-none">
        
        {/* Desktop Nav */}
        <div className="hidden md:block max-w-7xl mx-auto pt-6 pb-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <BrandSection total={total} />
            {desktopMenu}
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden relative" ref={ref}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <BrandSection total={total} />

              <Hamburger
                isOpen={isMobileOpen}
                toggle={() => setIsMobileOpen((prev) => !prev)}
              />
            </div>
          </div>

          {isMobileOpen && (
            <div className="absolute top-full left-0 w-full z-50 ">
              {mobileMenu}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}