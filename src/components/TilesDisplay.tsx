import { useRef, useState } from "react";
import TileGrid from "./TileGrid";
import type { Tile } from "../utils/types";
import useUpdateHeight from "../hooks/useUpdateHeight";
import useTileSorting from "../hooks/useTileSorting";

const GRID_COLUMNS = 6;
const GRID_ROWS = 4;

const TilesDisplay = (props: {
  pageTiles: Tile[];
  handlePageNavigation: (name: string) => void;
  speak: (text: string) => void;
}) => {
  const tilesDisplayRef = useRef(null);
  const [tileGridHeight, setTileGridHeight] = useState(0);
  const sortedPageTiles = useTileSorting(props.pageTiles);

  useUpdateHeight(tilesDisplayRef, setTileGridHeight);

  return (
    <div ref={tilesDisplayRef} className="tiles-display">
      {sortedPageTiles.map((subpageTiles) => (
        <TileGrid
          tiles={subpageTiles}
          columns={GRID_COLUMNS}
          rows={GRID_ROWS}
          tileGridHeight={tileGridHeight}
          handlePageNavigation={props.handlePageNavigation}
          speak={props.speak}
          key={JSON.stringify(subpageTiles)}
        />
      ))}
    </div>
  );
};

export default TilesDisplay;
