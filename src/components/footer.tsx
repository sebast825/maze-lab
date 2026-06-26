import { themeColors } from "./themes";

export function Footer() {
  return (
    <footer className="w-full text-sm py-4 mt-auto border-t border-slate-900 bg-slate-950 text-center italic">
      <p className=" text-slate-500 font-sans tracking-wide">
        Developed by{" "}
        <a
          href="https://github.com/sebast825"
          target="_blank"
          rel="noopener noreferrer"
          className={`${themeColors["slate"].text}  `}
        >
          Sebastián Molina
        </a>
      </p>
    </footer>
  );
}