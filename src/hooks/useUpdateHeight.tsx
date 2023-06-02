import { useEffect, useRef } from "react";

const useUpdateHeight = (
  ref: React.RefObject<HTMLElement>,
  setHeight: (height: number) => void
) => {
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const updateHeight = (entries: ResizeObserverEntry[]) => {
      if (!ref.current) return;

      const { height } = entries[0].contentRect;
      setHeight(height);
    };

    if (ref.current) {
      observerRef.current = new ResizeObserver(updateHeight);
      observerRef.current.observe(ref.current);

      const domRect = ref.current.getBoundingClientRect();
      updateHeight([
        {
          target: ref.current,
          contentRect: domRect,
          borderBoxSize: [
            { inlineSize: domRect.width, blockSize: domRect.height },
          ],
          contentBoxSize: [
            { inlineSize: domRect.width, blockSize: domRect.height },
          ],
          devicePixelContentBoxSize: [
            { inlineSize: domRect.width, blockSize: domRect.height },
          ],
        },
      ]);
    }

    return () => {
      if (observerRef.current && ref.current) {
        observerRef.current.unobserve(ref.current);
        observerRef.current.disconnect();
      }
    };
  }, [ref, setHeight]);
};

export default useUpdateHeight;
