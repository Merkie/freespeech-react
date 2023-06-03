import { useContext, useState } from "react";
import Modal from "./Modal";
import { AppModeContext } from "../contexts/AppModeContext";
import { ProjectContext } from "../contexts/ProjectContext";

const EditTileTextModal = () => {
  const { activeEditModeTile } = useContext(AppModeContext);
  const { activePage } = useContext(ProjectContext);
  const [tileText, setTileText] = useState(
    activePage.tiles.find(
      (tile) =>
        tile.x + "" === activeEditModeTile.split(" ")[0] &&
        tile.y + "" === activeEditModeTile.split(" ")[1] &&
        tile.subpageIndex + "" === activeEditModeTile.split(" ")[2]
    )?.text
  );
  const [showMoreSettings, setShowMoreSettings] = useState(false);

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
        { text: "Cancel", style: "secondary", onClick: () => null },
        { text: "Save changes", style: "primary", onClick: () => null },
      ]}
    />
  );
};

export default EditTileTextModal;
