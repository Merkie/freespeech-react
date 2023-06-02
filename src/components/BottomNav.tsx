import { useContext } from "react";
import { AppMode, IModal } from "../utils/types";
import { AppModeContext } from "../contexts/AppModeContext";
import { PageContext } from "../contexts/PageContext";

const BottomNav = (props: { setModal: (modal: IModal) => void }) => {
  const { activeAppMode, setActiveAppMode } = useContext(AppModeContext);
  const { resetPageHistory } = useContext(PageContext);

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
        props.setModal("dashboard-sign-in");
      },
    },
  ];

  return (
    <div className="bottom-nav">
      {dashboardButtons.map((button) => (
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
      ))}
    </div>
  );
};

export default BottomNav;
