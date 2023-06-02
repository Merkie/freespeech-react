import { useContext } from "react";
import TilesTopNav from "./TilesTopNav";
import TilesDisplay from "./TilesDisplay";
import EditToolbar from "./EditToolbar";
import { AppModeContext } from "../contexts/AppModeContext";
import EditMenu from "./EditMenu";

const MainApplication = () => {
  const { activeAppMode } = useContext(AppModeContext);
  return (
    <>
      {activeAppMode === "home" && <TilesTopNav />}
      {activeAppMode === "edit" && (
        <>
          <EditMenu />
          <EditToolbar />
        </>
      )}
      <TilesDisplay />
    </>
  );
};

export default MainApplication;
