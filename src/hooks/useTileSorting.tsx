import { useState, useEffect } from "react";
import type { Tile } from "../utils/types";

const useTileSorting = (pageTiles: Tile[]) => {
  const [sortedPageTiles, setSortedPageTiles] = useState<Tile[][]>([]);

  useEffect(() => {
    const newSortedTiles: Tile[][] = [];

    pageTiles.forEach((tile) => {
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
  }, [pageTiles]);

  return sortedPageTiles;
};

export default useTileSorting;
