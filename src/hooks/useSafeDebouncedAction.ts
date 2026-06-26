import { useRef } from "react";

/**
 * Hook that executes a function with:
 * - debounce (delays execution until user stops triggering it)
 * - lock (prevents concurrent executions)
 */
export function useSafeDebouncedAction(delay = 300) {
  /**
   * Stores the active timeout ID across renders.
   * .current is where the actual mutable value lives.
   */
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Flag indicating if an async execution is currently running.
   * Prevents multiple overlapping executions.
   */
  const runningRef = useRef(false);

  /**
   * Returns a debounced + safe execution function.
   */
  const run = (fn: () => Promise<void> | void) => {
    // If something is already running, ignore new triggers
    if (runningRef.current) return;

    // Clear previous pending debounce call (if any)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Schedule new execution
    timeoutRef.current = setTimeout(async () => {
      runningRef.current = true; // lock execution

      try {
        await fn(); // execute user function
      } finally {
        runningRef.current = false; // always release lock
      }
    }, delay);
  };

  return run;
}
