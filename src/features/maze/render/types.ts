export const ThemeDraw = {
  NEON: "neon",
  PRINT: "print",
} as const;

export type ThemeDrawType = (typeof ThemeDraw)[keyof typeof ThemeDraw];
