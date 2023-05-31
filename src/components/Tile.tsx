import { Tile } from "../utils/types";

const Tile = (
  props: Tile & { handlePageNavigation: (name: string) => void }
) => {
  const handleInteraction = () => {
    if (props.folder) {
      props.handlePageNavigation(props.folder);
    }
  };

  return (
    <button
      style={{ gridColumnStart: props.x + 1, gridRowStart: props.y + 1 }}
      className={props.image ? "img" : "no-img"}
      onClick={handleInteraction}
    >
      <p>{props.text}</p>
      {props.image && <img src={props.image} />}
    </button>
  );
};

export default Tile;
