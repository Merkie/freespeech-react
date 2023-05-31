import Tile from "./Tile";
import type { Tile as ITile } from "../utils/types";

const TileGrid = (props: {
  tileGridHeight: number;
  columns: number;
  rows: number;
  tiles: ITile[];
  handlePageNavigation: (name: string) => void;
}) => {
  return (
    <div
      style={{
        height: `${props.tileGridHeight - 10}px`,
        gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
        gridTemplateRows: `repeat(${props.rows}, 1fr)`,
      }}
      className="tile-grid"
    >
      {props.tiles.map((tile) => (
        <Tile handlePageNavigation={props.handlePageNavigation} {...tile} />
      ))}
    </div>
  );
};

export default TileGrid;
