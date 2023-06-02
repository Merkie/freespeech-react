import { useState } from "react";
import { IModal } from "../utils/types";
import SignInModal from "../components/SignInModal";

export default function useModalManager() {
  const [openModal, setOpenModal] = useState<IModal>("");

  const renderModal = () => {
    switch (openModal) {
      case "dashboard-sign-in":
        return <SignInModal setOpenModal={setOpenModal} />;
      default:
        return null;
    }
  };

  return { renderModal, setOpenModal };
}
