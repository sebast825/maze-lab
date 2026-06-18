export const NAV_CLASSES = {
  select:
    "bg-transparent text-slate-200 pb-0.5 focus:outline-none focus:border-indigo-500 cursor-pointer uppercase text-xs",
  inputNumber:
    "w-10 bg-transparent text-slate-200 pb-0.5 text-center focus:outline-none focus:border-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
  inputNumberMobile:
    "w-8 bg-transparent text-slate-200 border-b border-slate-800 text-center focus:outline-none",
  dropdownContainer:
    "absolute left-0 bg-slate-950 border border-slate-900 rounded shadow-2xl z-50",
  mobileContainer:
    "px-6 pt-4 pb-8 space-y-3 bg-slate-950 border-t border-slate-900 flex flex-col items-center text-center text-xs font-mono uppercase tracking-wider",
} as const;
