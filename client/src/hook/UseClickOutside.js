import { useRef, useEffect, useState } from "react";

const useClickAway = (ref, onClickAway, isVisible) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isMounted && isVisible) {
      const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          onClickAway();
        }
      };

      document.addEventListener("mousedown", handleClick);
      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }
  }, [ref, onClickAway, isVisible, isMounted]);
};

export default useClickAway;
