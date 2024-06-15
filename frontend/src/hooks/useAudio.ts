// 音楽再生機能を提供するカスタムフック

import { useState, useEffect } from "react";

export const useAudio = (url: string): [boolean, () => void] => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const playToggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    const handleEnded = () => setPlaying(false);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  audio.loop = true;
  audio.volume = 0.03;

  return [playing, playToggle];
};
