import { Tile } from "../utils/types";

const Tile = (props: Tile) => {
  return (
    <button
      style={{ gridColumnStart: props.x + 1, gridRowStart: props.y + 1 }}
      className={props.image ? "img" : "no-img"}
    >
      <p>{props.text}</p>
      {props.image && <img src={props.image} />}
    </button>
  );
};

export default Tile;
