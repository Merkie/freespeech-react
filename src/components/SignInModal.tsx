import { useContext, useState } from "react";
import { IModal } from "../utils/types";
import Modal from "./Modal";
import { UserContext } from "../contexts/UserContext";

const SignInModal = (props: { setOpenModal: (modal: IModal) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setToken } = useContext(UserContext);

  const handleSignIn = async () => {
    const response = await fetch(
      "https://api.freespeechaac.com/v1/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    const { token, error } = await response.json();

    if (error) {
      setError(error);
      return;
    }

    setError("");
    setToken(token);
    props.setOpenModal("");
  };

  return (
    <Modal
      title="You must be signed in"
      content={
        <>
          <p>Email:</p>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Password:</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
        </>
      }
      buttons={[{ text: "Sign in", style: "primary", onClick: handleSignIn }]}
      setOpenModal={props.setOpenModal}
    />
  );
};

export default SignInModal;
