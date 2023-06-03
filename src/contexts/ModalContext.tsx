import { ReactElement, createContext } from "react";
import { IModal } from "../utils/types";
import useModalManager from "../hooks/useModalManager";

export const ModalContext = createContext<{
  setModal: (modalName: IModal) => void;
}>({
  setModal: () => null,
});

export const ModalProvider = ({ children }: { children: ReactElement }) => {
  const { renderModal, setOpenModal } = useModalManager();

  const setModal = (modalName: IModal) => {
    setOpenModal(modalName);
  };

  return (
    <ModalContext.Provider
      value={{
        setModal,
      }}
    >
      {renderModal()}
      {children}
    </ModalContext.Provider>
  );
};
