import React, { useContext, useCallback } from "react";
import { AppModeContext } from "../contexts/AppModeContext";
import { ProjectContext } from "../contexts/ProjectContext";
import { SpeechContext } from "../contexts/SpeechContext";
import { Folder } from "react-bootstrap-icons";
import type { Tile as ITile } from "../utils/types";
// import useTileEdit from "../hooks/useTileEdit";
import { ModalContext } from "../contexts/ModalContext";

const Tile: React.FC<ITile> = (props) => {
  const { setActiveEditModeTile, activeAppMode, activeEditModeTool } =
    useContext(AppModeContext);
  const { handlePageNavigation } = useContext(ProjectContext);
  const { speak } = useContext(SpeechContext);
  const { setModal } = useContext(ModalContext);

  const handleInteraction = () => {
    if (activeAppMode === "home") {
      if (props.folder) {
        handlePageNavigation(props.folder);
      } else {
        speak(props.text);
      }
    } else if (activeAppMode === "edit") {
      setActiveEditModeTile(`${props.x} ${props.y} ${props.subpageIndex}`);
      if (activeEditModeTool === "text") {
        setModal("edit-tile-text");
      }
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
      {props.folder && (
        <div className="folder">
          <Folder />
        </div>
      )}
    </button>
  );
};

export default Tile;
