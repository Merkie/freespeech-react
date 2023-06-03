import { useState } from "react";
import { IModal } from "../utils/types";
import SignInModal from "../components/SignInModal";
import EditTileTextModal from "../components/EditTileTextModal";

export default function useModalManager() {
  const [openModal, setOpenModal] = useState<IModal>("");

  const renderModal = () => {
    switch (openModal) {
      case "dashboard-sign-in":
        return <SignInModal setOpenModal={setOpenModal} />;
      case "edit-tile-text":
        return <EditTileTextModal />;
      default:
        return null;
    }
  };

  return { renderModal, setOpenModal };
}
