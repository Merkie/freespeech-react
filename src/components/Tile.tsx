import { PageContext } from "../contexts/PageContext";
import { SpeechContext } from "../contexts/SpeechContext";
import { Tile } from "../utils/types";
import { useContext } from "react";

const Tile = (props: Tile) => {
  const { handlePageNavigation } = useContext(PageContext);
  const { speak } = useContext(SpeechContext);

  const handleInteraction = () => {
    if (props.folder) {
      handlePageNavigation(props.folder);
    } else {
      speak(props.text);
      console.log(props.text);
    }
  };

  return (
    <button
      style={{ gridColumnStart: props.x + 1, gridRowStart: props.y + 1 }}
      className={`tile ${props.image ? "img" : "no-img"}`}
      onClick={handleInteraction}
    >
      <p>{props.text}</p>
      {props.image && <img src={props.image} />}
    </button>
  );
};

export default Tile;
