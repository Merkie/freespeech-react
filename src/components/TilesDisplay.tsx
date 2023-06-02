import { useContext, useEffect, useRef, useState } from "react";
import TileGrid from "./TileGrid";
import type { Tile } from "../utils/types";
import useUpdateHeight from "../hooks/useUpdateHeight";
import useTileSorting from "../hooks/useTileSorting";
import { ProjectContext } from "../contexts/ProjectContext";
import { AppModeContext } from "../contexts/AppModeContext";

const GRID_COLUMNS = 6;
const GRID_ROWS = 4;

const TilesDisplay = () => {
  const tilesDisplayRef = useRef(null);
  const [tileGridHeight, setTileGridHeight] = useState(0);
  const { activePage, getCurrentPageWithEdits } = useContext(ProjectContext);
  const { activeAppMode } = useContext(AppModeContext);

  // const [pageTiles, setPageTiles] = useState<Tile[]>([]);

  const sortedPageTiles = useTileSorting(
    activeAppMode === "edit"
      ? getCurrentPageWithEdits().tiles
      : activePage.tiles
  );

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
