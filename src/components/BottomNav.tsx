import { useState } from "react";
import type { AppMode } from "../utils/types";

const BottomNav = (props: { resetPageHistory: () => void }) => {
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
    },
    {
      name: "dashboard",
      disabled: true,
    },
  ];

  return (
    <div className="bottom-nav">
      {dashboardButtons.map((button) => (
        <button
          className={activeAppMode === button.name ? "selected" : ""}
          onClick={() => {
            setActiveAppMode(button.name as AppMode);
            if (button.onClick) {
              button.onClick();
            }
          }}
          disabled={button.disabled}
        >
          {button.name}
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
