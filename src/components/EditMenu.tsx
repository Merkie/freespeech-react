import { useContext } from "react";
import { AppModeContext } from "../contexts/AppModeContext";

const EditMenu = () => {
  const { activeEditModeTool } = useContext(AppModeContext);
  return (
    <div className="edit-menu">
      <p>
        Active tool: <span>{activeEditModeTool}</span>
      </p>
    </div>
  );
};

export default EditMenu;
