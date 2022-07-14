import { RefObject, useEffect } from "react";

export const useOutsideAlerter = (
  func: Function,
  ref: RefObject<HTMLElement>
) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        func();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, func]);
};
