import { ReactElement } from "react";
import { X } from "react-bootstrap-icons";
import type { IModal } from "../utils/types";

const Modal = (props: {
  title: string;
  content: ReactElement;
  buttons: { text: string; style: string; onClick: () => void }[];
  setOpenModal: (modal: IModal) => void;
}) => {
  return (
    <div className="modal-wrapper">
      <div className="modal">
        <div className="modal-header">
          <p>{props.title}</p>
          <button onClick={() => props.setOpenModal("")}>
            <X />
          </button>
        </div>
        <div className="modal-content">{props.content}</div>
        <div className="modal-footer">
          {props.buttons.map((button, i) => (
            <button
              key={i}
              onClick={button.onClick}
              className={`btn-${button.style}`}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
