import { useContext } from "react";
import { AppModeContext } from "../contexts/AppModeContext";

const ColorSwatches = () => {
  const { selectedColor, setSelectedColor } = useContext(AppModeContext);

  return (
    <div className="color-swatches">
      {["red", "orange", "yellow", "green", "blue", "purple", "pink"].map(
        (color) => (
          <button
            key={color}
            style={{ background: `var(--${color}-border)` }}
            className={selectedColor === color ? "selected" : ""}
            onClick={() => setSelectedColor(color)}
          ></button>
        )
      )}
    </div>
  );
};

const EditMenu = () => {
  const { activeEditModeTool } = useContext(AppModeContext);
  return (
    <div className="edit-menu">
      <p>
        Active tool: <span>{activeEditModeTool}</span>
      </p>
      {activeEditModeTool === "color" && <ColorSwatches />}
    </div>
  );
};

export default EditMenu;
