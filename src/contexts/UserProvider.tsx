import { ReactElement, createContext, useEffect, useState } from "react";
import { User } from "../utils/types";

export const UserContext = createContext<{
  token: string;
  setToken: (token: string) => void;
  user: User;
}>({
  token: "",
  setToken: () => null,
  user: null,
});

export const UserProvider = ({ children }: { children: ReactElement }) => {
  const [token, setToken] = useState(
    localStorage.getItem("freespeech-token") || ""
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("freespeech-user") || "null")
  );

  const fetchUser = async () => {
    const response = await fetch("https://api.freespeechaac.com/v1/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.user) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    localStorage.setItem("freespeech-token", token);
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    localStorage.setItem("freespeech-user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
