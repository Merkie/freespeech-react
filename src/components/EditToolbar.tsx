import { useContext } from "react";
import { AppModeContext } from "../contexts/AppModeContext";
import { EditModeTool } from "../utils/types";
import {
  Icon,
  Fonts,
  Image,
  Palette,
  ArrowsMove,
  Folder,
  Grid,
  Trash,
} from "react-bootstrap-icons";

const EditToolbar = () => {
  const { activeEditModeTool, setActiveEditModeTool } =
    useContext(AppModeContext);
  const buttons: { name: EditModeTool; icon: Icon }[] = [
    { name: "text", icon: Fonts },
    { name: "image", icon: Image },
    { name: "color", icon: Palette },
    { name: "move", icon: ArrowsMove },
    { name: "folder", icon: Folder },
    { name: "template", icon: Grid },
    { name: "delete", icon: Trash },
  ];
  return (
    <div className="toolbar">
      {buttons.map((button) => (
        <button
          className={activeEditModeTool === button.name ? "selected" : ""}
          onClick={() => setActiveEditModeTool(button.name)}
          key={button.name}
        >
          <button.icon size={15} />
          {button.name}
        </button>
      ))}
    </div>
  );
};

export default EditToolbar;
