import { useContext } from "react";
import { AppMode, IModal } from "../utils/types";
import { AppModeContext } from "../contexts/AppModeContext";
import { ProjectContext } from "../contexts/ProjectContext";

const BottomNav = (props: { setOpenModal: (modal: IModal) => void }) => {
  const { activeAppMode, setActiveAppMode, setActiveEditModeTile } =
    useContext(AppModeContext);
  const { resetPageHistory, mergeCurrentPageEdits, clearCurrentPageEdits } =
    useContext(ProjectContext);

  const dashboardButtons: {
    name: AppMode;
    onClick?: () => void;
    disabled?: boolean;
  }[] = [
    {
      name: "home",
      onClick: () => {
        setActiveAppMode("home");
        resetPageHistory();
      },
    },
    {
      name: "edit",

      onClick: () => {
        setActiveAppMode("edit");
      },
    },
    {
      name: "dashboard",
      disabled: true,
      onClick: () => {
        props.setOpenModal("dashboard-sign-in");
      },
    },
  ];

  return (
    <div className="bottom-nav">
      {activeAppMode === "edit" ? (
        <>
          <button
            onClick={() => {
              clearCurrentPageEdits();
              setActiveAppMode("home");
            }}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              mergeCurrentPageEdits();
              // clearCurrentPageEdits();
              setActiveAppMode("home");
            }}
            className="btn-primary"
          >
            Save changes
          </button>
        </>
      ) : (
        dashboardButtons.map((button) => (
          <button
            className={activeAppMode === button.name ? "selected" : ""}
            onClick={() => {
              if (button.onClick) {
                button.onClick();
              }
              if (!button.disabled) setActiveAppMode(button.name as AppMode);
            }}
            style={{ opacity: button.disabled ? 0.5 : 1 }}
            key={button.name}
          >
            {button.name}
          </button>
        ))
      )}
    </div>
  );
};

export default BottomNav;
