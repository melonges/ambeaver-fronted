import { useLayoutEffect, useMemo, useRef } from "react";

export const useDebounce = <T extends (...args: any) => any>(
  callback: T,
  delay = 300
) => {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return useMemo(
    () =>
      debounce(
        (...args: Parameters<T>) =>
          callbackRef.current(...args) as ReturnType<T>,
        delay
      ),
    [delay]
  );
};

export const debounce = <T extends (...args: any) => any>(
  callback: T,
  timeout = 300
) => {
  let timer: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(callback, args);
    }, timeout);
  };
};
