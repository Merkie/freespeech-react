import { useState } from "react";

function useSpeech() {
  const [speaking, setSpeaking] = useState(false);

  const speak = (text: string) => {
    if (speaking) return;
    setSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
    utterance.onend = () => {
      setSpeaking(false);
    };
  };

  return speak;
}

export default useSpeech;
