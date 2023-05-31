import { useEffect, useRef, useState } from "react";
import TileGrid from "./TileGrid";
import type { Tile } from "../utils/types";

const TilesDisplay = (props: { pageTiles: Tile[] }) => {
  const tilesDisplayRef = useRef(null);
  const [tileGridHeight, setTileGridHeight] = useState(0);
  const [sortedPageTiles, setSortedPageTiles] = useState<Tile[][]>([]);

  useEffect(() => {
    const newSortedTiles: Tile[][] = [];

    props.pageTiles.forEach((tile) => {
      if (newSortedTiles[tile.subpageIndex]) {
        newSortedTiles[tile.subpageIndex] = [
          ...newSortedTiles[tile.subpageIndex],
          tile,
        ];
      } else {
        newSortedTiles[tile.subpageIndex] = [tile];
      }
    });

    setSortedPageTiles(newSortedTiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pageTiles]); // remove sortedPageTiles from the dependency array

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
      {sortedPageTiles.map((subpageTiles, index) => (
        <TileGrid
          tiles={subpageTiles}
          columns={6}
          rows={4}
          tileGridHeight={tileGridHeight}
        />
      ))}
    </div>
  );
};

export default TilesDisplay;
