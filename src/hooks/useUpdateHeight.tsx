import { useEffect } from "react";

const useUpdateHeight = (
  ref: React.RefObject<HTMLElement>,
  setHeight: (height: number) => void
) => {
  useEffect(() => {
    const updateHeight = () => {
      if (!ref.current) return;

      const height = (ref.current as unknown as { clientHeight: number })
        .clientHeight;
      setHeight(height);
    };

    updateHeight(); // Initial height update

    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [ref, setHeight]);
};

export default useUpdateHeight;
