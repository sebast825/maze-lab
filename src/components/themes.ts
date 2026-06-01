// Style maps defined outside to prevent re-allocation on every render
export const colorVariants = {
  orange: "bg-orange-500 hover:bg-orange-400 text-white shadow-[0_0_10px_rgba(249,115,22,0.6)] hover:shadow-[0_0_15px_rgba(249,115,22,0.8)]",
  red: "bg-red-500 hover:bg-red-400 text-white shadow-[0_0_10px_rgba(239,68,68,0.6)] hover:shadow-[0_0_15px_rgba(239,68,68,0.8)]",
  slate: "bg-slate-400 hover:bg-slate-300 text-slate-950 shadow-[0_0_10px_rgba(148,163,184,0.4)] hover:shadow-[0_0_15px_rgba(148,163,184,0.6)]",
  rose: "bg-rose-500 hover:bg-rose-400 text-white shadow-[0_0_10px_rgba(244,63,94,0.6)] hover:shadow-[0_0_15px_rgba(244,63,94,0.8)]",
  blue: "bg-blue-500 hover:bg-blue-400 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)] hover:shadow-[0_0_15px_rgba(59,130,246,0.8)]",
  purple: "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.6)] hover:shadow-[0_0_15px_rgba(168,85,247,0.8)]",
  green: "bg-green-700 hover:bg-green-600 text-white shadow-[0_0_10px_rgba(34,197,94,0.6)] hover:shadow-[0_0_15px_rgba(34,197,94,0.8)]",
};

export const sizeVariants = {
  sm: "p-2.5", 
  md: "p-4",   
};

export const PANEL_CLASSES = {
  container: "rounded-lg bg-slate-900 p-4 border border-slate-700 w-full sm:mx-0 sm:w-auto",
  card: "rounded border border-slate-700 bg-slate-800 p-4",
  input: "rounded bg-slate-700 text-white px-2 py-1 outline-none focus:ring-1 focus:ring-purple-500",
  title: "mb-4 text-xl font-semibold",
} as const;