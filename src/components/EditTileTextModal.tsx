import { useContext, useState } from "react";
import Modal from "./Modal";
import { AppModeContext } from "../contexts/AppModeContext";
import { ProjectContext } from "../contexts/ProjectContext";
import { Tile } from "../utils/types";
import { ModalContext } from "../contexts/ModalContext";

const EditTileTextModal = () => {
  const { activeEditModeTile } = useContext(AppModeContext);
  const { activePageTilesWithEdits, addEdit } = useContext(ProjectContext);
  const activeTile = activePageTilesWithEdits.find(
    (tile) =>
      tile.x + "" === activeEditModeTile.split(" ")[0] &&
      tile.y + "" === activeEditModeTile.split(" ")[1] &&
      tile.subpageIndex + "" === activeEditModeTile.split(" ")[2]
  );
  const [tileText, setTileText] = useState(activeTile?.text);
  const [showMoreSettings, setShowMoreSettings] = useState(false);
  const { setModal } = useContext(ModalContext);

  const finalizeTileTextEdit = () => {
    addEdit({
      ...activeTile,
      text: tileText,
    } as Tile);
    setModal("");
  };

  return (
    <Modal
      title="Edit tile text"
      content={
        <>
          <p>Tile Text:</p>
          <input
            type="text"
            value={tileText}
            onChange={(e) => setTileText(e.target.value)}
          />
          {showMoreSettings ? (
            <>
              <p style={{ marginTop: "10px" }}>Tile Display Text:</p>
              <input
                type="text"
                value={tileText}
                onChange={(e) => setTileText(e.target.value)}
              />
            </>
          ) : (
            <button
              onClick={() => setShowMoreSettings(true)}
              className="text-btn"
            >
              Show more...
            </button>
          )}
        </>
      }
      buttons={[
        { text: "Cancel", style: "secondary", onClick: () => setModal("") },
        {
          text: "Save changes",
          style: "primary",
          onClick: finalizeTileTextEdit,
        },
      ]}
    />
  );
};

export default EditTileTextModal;
