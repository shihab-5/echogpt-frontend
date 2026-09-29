/**
 * Trailing-edge debounce. Returns a wrapper that delays invoking `fn`
 * until `ms` have elapsed since the last call.
 */
export function debounce<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  ms: number,
): {
  (...args: TArgs): void;
  flush: () => void;
  cancel: () => void;
} {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: TArgs | null = null;

  function wrapped(...args: TArgs): void {
    lastArgs = args;
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (lastArgs) fn(...lastArgs);
      lastArgs = null;
    }, ms);
  }

  function flush(): void {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
      if (lastArgs) {
        fn(...lastArgs);
        lastArgs = null;
      }
    }
  }

  function cancel(): void {
    if (timer !== null) clearTimeout(timer);
    timer = null;
    lastArgs = null;
  }

  return Object.assign(wrapped, { flush, cancel });
}
