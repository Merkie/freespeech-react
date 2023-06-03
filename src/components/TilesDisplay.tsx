import { useContext, useRef, useState } from "react";
import TileGrid from "./TileGrid";
import useUpdateHeight from "../hooks/useUpdateHeight";
import useTileSorting from "../hooks/useTileSorting";
import { ProjectContext } from "../contexts/ProjectContext";
import { AppModeContext } from "../contexts/AppModeContext";

const TilesDisplay = () => {
  const tilesDisplayRef = useRef(null);
  const [tileGridHeight, setTileGridHeight] = useState(0);
  const { activePage, activePageTilesWithEdits, activeProject } =
    useContext(ProjectContext);
  const { activeAppMode } = useContext(AppModeContext);

  const sortedPageTiles = useTileSorting(
    activeAppMode === "edit" ? activePageTilesWithEdits : activePage.tiles
  );

  useUpdateHeight(tilesDisplayRef, setTileGridHeight);

  return (
    <div ref={tilesDisplayRef} className="tiles-display">
      {sortedPageTiles.map((subpageTiles) => (
        <TileGrid
          tiles={subpageTiles}
          columns={activeProject.columns}
          rows={activeProject.rows}
          tileGridHeight={tileGridHeight}
          key={JSON.stringify(subpageTiles)}
        />
      ))}
    </div>
  );
};

export default TilesDisplay;
