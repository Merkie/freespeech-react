import React, { useContext, useCallback } from "react";
import { AppModeContext } from "../contexts/AppModeContext";
import { ProjectContext } from "../contexts/ProjectContext";
import { SpeechContext } from "../contexts/SpeechContext";
import { Folder } from "react-bootstrap-icons";
import type { Tile as ITile } from "../utils/types";
import useTileEdit from "../hooks/useTileEdit";

const Tile: React.FC<ITile> = (props) => {
  const {
    activeEditModeTile,
    setActiveEditModeTile,
    activeAppMode,
    activeEditModeTool,
  } = useContext(AppModeContext);
  const { handlePageNavigation, addEdit } = useContext(ProjectContext);
  const { speak } = useContext(SpeechContext);
  const { editedTileText, setEditedTileText } = useTileEdit({
    activeAppMode,
    activeEditModeTool,
    activeEditModeTile,
    addEdit,
    props,
  });

  const handleInteraction = useCallback(() => {
    if (activeAppMode === "home") {
      if (props.folder) {
        handlePageNavigation(props.folder);
      } else {
        speak(props.text);
      }
    } else if (activeAppMode === "edit") {
      setActiveEditModeTile(`${props.x} ${props.y} ${props.subpageIndex}`);
    }
  }, [
    activeAppMode,
    props,
    handlePageNavigation,
    speak,
    setActiveEditModeTile,
  ]);

  return (
    <button
      style={{ gridColumnStart: props.x + 1, gridRowStart: props.y + 1 }}
      className={`tile ${props.image ? "img" : "no-img"}`}
      onClick={handleInteraction}
    >
      {activeAppMode === "edit" &&
      activeEditModeTool === "text" &&
      activeEditModeTile === `${props.x} ${props.y} ${props.subpageIndex}` ? (
        <input
          type="text"
          value={editedTileText}
          onInput={(e) => {
            setEditedTileText((e.target as unknown as { value: string }).value);
          }}
        />
      ) : (
        <p>{props.text}</p>
      )}
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
