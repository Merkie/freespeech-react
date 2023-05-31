import { useState } from "react";
import type { AppMode } from "../utils/types";

const BottomNav = () => {
  const [activeAppMode, setActiveAppMode] = useState<AppMode>("home");

  const dashboardButtons: { name: AppMode; disabled?: boolean }[] = [
    {
      name: "home",
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
          onClick={() => setActiveAppMode(button.name as AppMode)}
          disabled={button.disabled}
        >
          {button.name}
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
