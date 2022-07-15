import { useOutsideAlerter } from "@utils/hooks";
import React, { useRef, useState } from "react";

type IPopupProps = {
  children: React.ReactNode;
  close: () => void;
  title: string;
};

export default function Popup({ children, close, title }: IPopupProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const [isClosing, setIsClosing] = useState(false);
  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    if (mainRef.current) {
      mainRef.current.animate([{ opacity: "1" }, { opacity: "0" }], {
        duration: 200,
        iterations: 1,
        easing: "ease-in-out",
        fill: "forwards",
      });
    }
    setTimeout(() => {
      close();
      setIsClosing(false);
    }, 200);
  };

  useOutsideAlerter(handleClose, divRef);

  return (
    <div className="popup__bg" ref={mainRef}>
      <div className="popup__container" ref={divRef}>
        <div className="popup__header">
          <h1>{title}</h1>
          <div className="popup__header__close" onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div className="popup__content">{children}</div>
      </div>
    </div>
  );
}
