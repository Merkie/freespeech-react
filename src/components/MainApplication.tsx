import { useContext } from "react";
import TilesTopNav from "./TilesTopNav";
import TilesDisplay from "./TilesDisplay";
import EditToolbar from "./EditToolbar";
import { AppModeContext } from "../contexts/AppModeContext";

const MainApplication = () => {
  const { activeAppMode } = useContext(AppModeContext);
  return (
    <>
      {activeAppMode === "home" && <TilesTopNav />}
      {activeAppMode === "edit" && <EditToolbar />}
      <TilesDisplay />
    </>
  );
};

export default MainApplication;
