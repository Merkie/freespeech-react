import { useState } from "react";
import type { AppMode, IModal } from "../utils/types";

const BottomNav = (props: {
  resetPageHistory: () => void;
  setModal: (modal: IModal) => void;
}) => {
  const [activeAppMode, setActiveAppMode] = useState<AppMode>("home");

  const dashboardButtons: {
    name: AppMode;
    onClick?: () => void;
    disabled?: boolean;
  }[] = [
    {
      name: "home",
      onClick: () => {
        setActiveAppMode("home");
        props.resetPageHistory();
      },
    },
    {
      name: "edit",
      disabled: true,
      onClick: () => {
        props.setModal("edit-sign-in");
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
