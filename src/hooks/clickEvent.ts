import { useCallback, useRef } from "react";

/**
 * Provides Ref and onClickRef callback to make any HTMLInputElement clickable.
 *
 * @returns { clickRef: React.MutableRefObject<HTMLInputElement | null>, onClickRef: () => void}
 */
const useClickEvent = () => {
  const clickRef = useRef<HTMLInputElement>(null);
  const onClickRef = useCallback(() => {
    clickRef.current?.click();
  }, []);
  return { clickRef, onClickRef };
};

export default useClickEvent;
