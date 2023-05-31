import { useEffect, useRef, useState } from "react";

const TilesDisplay = () => {
  const tilesDisplayRef = useRef(null);
  const [tileGridHeight, setTileGridHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (!tilesDisplayRef.current) return;

      const height = (
        tilesDisplayRef.current as unknown as { clientHeight: number }
      ).clientHeight;
      setTileGridHeight(height);
    };

    updateHeight(); // Initial height update

    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [tilesDisplayRef]);

  return (
    <div ref={tilesDisplayRef} className="tiles-display">
      <div
        style={{
          height: `${tileGridHeight - 10}px`,
          gridTemplateColumns: "repeat(6, 1fr)",
          gridTemplateRows: "repeat(4, 1fr)",
        }}
        className="tile-grid"
      >
        <button className="no-img">Hello!</button>
        <button className="no-img">Hello!</button>
        <button className="no-img">Hello!</button>
        <button className="no-img">Hello!</button>
        <button className="no-img">Hello!</button>
        <button className="no-img">Hello!</button>
        <button className="no-img">Hello!</button>
        <button className="no-img">Hello!</button>
        <button className="no-img">Hello!</button>
        <button className="no-img">Hello!</button>
        <button className="no-img">Hello!</button>
        <button className="no-img">Hello!</button>
        <button className="no-img">Hello!</button>
        <button className="no-img">Hello!</button>
        <button className="no-img">Hello!</button>
        <button className="no-img">Hello!</button>
        <button className="no-img">Hello!</button>
        <button className="no-img">Hello!</button>
        <button className="no-img">Hello!</button>
        <button className="no-img">Hello!</button>
        <button className="no-img">Hello!</button>
        <button className="no-img">Hello!</button>
        <button className="no-img">Hello!</button>
        <button className="no-img">Hello!</button>
      </div>
    </div>
  );
};

export default TilesDisplay;
