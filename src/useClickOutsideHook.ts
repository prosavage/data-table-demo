import { useEffect, RefObject } from 'react';

/**
 * This Hook can be used for detecting clicks outside the Opened Menu
 */
export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  onClickOutside: () => void
): void => {
  useEffect(() => {
    /**
     * Invoke Function onClick outside of element
     */
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    }
    // Bind
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // dispose
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
};
