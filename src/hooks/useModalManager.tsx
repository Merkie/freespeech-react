import { useState } from "react";
import { IModal } from "../utils/types";
import Modal from "../components/Modal";

export default function useModalManager() {
  const [openModal, setOpenModal] = useState<IModal>("");

  const setModal = (modal: IModal) => {
    setOpenModal(modal);
  };

  const renderModal = () => {
    switch (openModal) {
      case "edit-sign-in":
        return (
          <Modal
            title="You must be signed in"
            content={<p>You need to be signed in to edit this page</p>}
            buttons={[
              { text: "Create account", style: "secondary" },
              { text: "Sign in", style: "primary" },
            ]}
            setModal={setModal}
          />
        );
      case "dashboard-sign-in":
        return (
          <Modal
            title="You must be signed in"
            content={<p>You need to be signed in to use the dashboard</p>}
            buttons={[
              { text: "Create account", style: "secondary" },
              { text: "Sign in", style: "primary" },
            ]}
            setModal={setModal}
          />
        );
      default:
        return null;
    }
  };

  return { renderModal, setModal };
}
