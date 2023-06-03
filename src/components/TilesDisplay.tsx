import { useContext, useRef, useState } from "react";
import TileGrid from "./TileGrid";
import useUpdateHeight from "../hooks/useUpdateHeight";
import useTileSorting from "../hooks/useTileSorting";
import { ProjectContext } from "../contexts/ProjectContext";
import { AppModeContext } from "../contexts/AppModeContext";

const GRID_COLUMNS = 6;
const GRID_ROWS = 4;

const TilesDisplay = () => {
  const tilesDisplayRef = useRef(null);
  const [tileGridHeight, setTileGridHeight] = useState(0);
  const { activePage, activePageTilesWithEdits } = useContext(ProjectContext);
  const { activeAppMode } = useContext(AppModeContext);

  const sortedPageTiles = useTileSorting(
    activeAppMode === "edit" ? activePageTilesWithEdits : activePage.tiles
  );

  useUpdateHeight(tilesDisplayRef, setTileGridHeight);

  return (
    <div ref={tilesDisplayRef} className="tiles-display">
      {/* <pre>{JSON.stringify(activePageTilesWithEdits)}</pre> */}
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
