import { useContext, useState } from "react";
import { IModal } from "../utils/types";
import Modal from "./Modal";
import { UserContext } from "../contexts/UserContext";

const EditTileTextModal = (props: {
  setOpenModal: (modal: IModal) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setToken } = useContext(UserContext);

  return (
    <Modal
      title="You must be signed in"
      content={
        <>
          <p>Tile Text:</p>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <p>Password:</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error">{error}</p>} */}
        </>
      }
      buttons={[
        { text: "Cancel", style: "secondary", onClick: () => null },
        { text: "Save changes", style: "primary", onClick: () => null },
      ]}
      setOpenModal={props.setOpenModal}
    />
  );
};

export default EditTileTextModal;
