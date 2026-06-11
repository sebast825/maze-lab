export function format(value: unknown): string {
  return typeof value === "number" ? value.toFixed(2) : String(value);
}
