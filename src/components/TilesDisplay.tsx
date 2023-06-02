import { useContext, useEffect, useRef, useState } from "react";
import TileGrid from "./TileGrid";
import type { Tile } from "../utils/types";
import useUpdateHeight from "../hooks/useUpdateHeight";
import useTileSorting from "../hooks/useTileSorting";
import english from "../utils/layouts/english";
import { PageContext } from "../contexts/PageContext";

const GRID_COLUMNS = 6;
const GRID_ROWS = 4;

const TilesDisplay = () => {
  const tilesDisplayRef = useRef(null);
  const [tileGridHeight, setTileGridHeight] = useState(0);
  const { pageHistory, pageIndex } = useContext(PageContext);

  const [pageTiles, setPageTiles] = useState<Tile[]>([]);
  useEffect(() => {
    setPageTiles(
      english.pages.find((page) => page.name === pageHistory[pageIndex])
        ?.tiles || []
    );
  }, [pageHistory, pageIndex]);
  const sortedPageTiles = useTileSorting(pageTiles);

  useUpdateHeight(tilesDisplayRef, setTileGridHeight);

  return (
    <div ref={tilesDisplayRef} className="tiles-display">
      {sortedPageTiles.map((subpageTiles) => (
        <TileGrid
          tiles={subpageTiles}
          columns={GRID_COLUMNS}
          rows={GRID_ROWS}
          tileGridHeight={tileGridHeight}
          key={JSON.stringify(subpageTiles)}
        />
      ))}
    </div>
  );
};

export default TilesDisplay;
