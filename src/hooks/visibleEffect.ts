import { MutableRefObject, useEffect, useRef } from "react";

/**
 * Provides a hook to run a callback function when the target element gets into the viewport.
 * The target element should be referenced by the returned ref object.
 *
 * @param callback
 * @returns
 */
export const useVisibleEffect = (
  callback: () => void
): { observerTarget: MutableRefObject<null> } => {
  // target to be seen
  const observerTarget = useRef(null);

  useEffect(() => {
    // set the observer API to observe the target element
    const observer = new IntersectionObserver(
      (entries) => {
        // if the target element is intersecting with the root container,
        // that is, if the target element gets into the viewport,
        if (entries[0].isIntersecting) {
          // run the callback function
          callback();
        }
      },
      { threshold: 1 } // do it when the target "fully(1.0)" gets into the viewport
    );

    // if observerTarget changes(being non-null), that is, if the component is mounted,
    if (observerTarget.current) {
      // start observing the target element
      observer.observe(observerTarget.current);
    }

    // when the component unmounts,
    return () => {
      // if any target is being observed, stop observing it.
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };

    // whenever the observerTarget changes, re-run the effect.
  }, [observerTarget]);

  return { observerTarget };
};
