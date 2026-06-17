export const themeColors = {
  indigo: {
    text: "text-indigo-400 hover:text-indigo-300",
    bg: "bg-indigo-500 hover:bg-indigo-400 text-slate-950",
    border:
      "border-indigo-500/30 hover:border-indigo-400 bg-indigo-950/10 hover:bg-indigo-950/30",
  },
  slate: {
    text: "text-slate-300 hover:text-white",
    bg: "bg-slate-200 hover:bg-white text-slate-950",
    border:
      "border-slate-800/80 hover:border-slate-700 bg-slate-900/30 hover:bg-slate-900",
  },
  rose: {
    text: "text-rose-400 hover:text-rose-300",
    bg: "bg-rose-500 hover:bg-rose-400 text-slate-950",
    border:
      "border-rose-500/30 hover:border-rose-400 bg-rose-950/10 hover:bg-rose-950/30",
  },
  orange: {
    text: "text-orange-400 hover:text-orange-300",
    bg: "bg-orange-500 hover:bg-orange-400 text-slate-950",
    border:
      "border-orange-500/30 hover:border-orange-400 bg-orange-950/10 hover:bg-orange-950/30",
  },
  white: {
    text: "text-slate-100 hover:text-white",
    bg: "bg-slate-100 hover:bg-white text-slate-950",
    border:
      "border-slate-700 hover:border-slate-500 bg-slate-900/20 hover:bg-slate-900/50",
  },
  blue: {
    text: "text-blue-400 hover:text-blue-300",
    bg: "bg-blue-500 hover:bg-blue-400 text-slate-950",
    border:
      "border-blue-500/30 hover:border-blue-400 bg-blue-950/10 hover:bg-blue-950/30",
  },
  red: {
    text: "text-red-400 hover:text-red-300",
    bg: "bg-red-500 hover:bg-red-400 text-slate-950",
    border:
      "border-red-500/30 hover:border-red-400 bg-red-950/10 hover:bg-red-950/30",
  },
  green: {
    text: "text-emerald-400 hover:text-emerald-300",
    bg: "bg-emerald-500 hover:bg-emerald-400 text-slate-950",
    border:
      "border-emerald-500/30 hover:border-emerald-400 bg-emerald-950/10 hover:bg-emerald-950/30",
  },
  purple: {
    text: "text-purple-400 hover:text-purple-300",
    bg: "bg-purple-500 hover:bg-purple-400 text-slate-950",
    border:
      "border-purple-500/30 hover:border-purple-400 bg-purple-950/10 hover:bg-purple-950/30",
  },
} as const;

export type IcolorVariants = keyof typeof themeColors;

export const sizeVariants = {
  sm: "p-2.5",
  md: "p-4",
};

export type IsizeVariants = keyof typeof sizeVariants;

export const PANEL_CLASSES = {
  container:
    "rounded-lg bg-slate-900 p-4 border border-slate-700 w-full sm:mx-0 sm:w-auto",
  card: "rounded border border-slate-700 bg-slate-800 p-4",
  input:
    "rounded bg-slate-700 text-white px-2 py-1 outline-none focus:ring-1 focus:ring-purple-500",
  title: "mb-4 text-xl",
} as const;
