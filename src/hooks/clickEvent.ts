import { useCallback, useRef } from "react";

const useClickEvent = () => {
  const clickRef = useRef<HTMLInputElement>(null);
  const onClickRef = useCallback(() => {
    clickRef.current?.click();
  }, []);
  return { clickRef, onClickRef };
};

export default useClickEvent;
