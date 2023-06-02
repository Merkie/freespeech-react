import { ReactElement, createContext } from "react";
import useSpeech from "../hooks/useSpeech";

export const SpeechContext = createContext<{
  speak: (text: string) => void;
}>({
  speak: () => null,
});

export const SpeechProvider = ({ children }: { children: ReactElement }) => {
  const speak = useSpeech();

  return (
    <SpeechContext.Provider
      value={{
        speak,
      }}
    >
      {children}
    </SpeechContext.Provider>
  );
};
