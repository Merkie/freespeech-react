import { ReactElement, createContext, useEffect } from "react";
import { User } from "../utils/types";
import { useLocalStorage } from "react-use";

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
  const [token, setToken] = useLocalStorage("freespeech-token", "");
  const [user, setUser] = useLocalStorage("freespeech-user", null);

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
    if (token) fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        token: token as string,
        setToken,
        user: user as User,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
