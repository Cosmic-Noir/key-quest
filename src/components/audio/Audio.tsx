import { useEffect } from "react";
import { useSoundSettings } from "../../hooks/useSoundSettings";

const Audio = () => {
  const { soundSettings } = useSoundSettings();
  const { isMusicPlaying = false, musicVolume = 0.5 } = soundSettings!;

  useEffect(() => {
    const audio = document.getElementById(
      "background-music"
    ) as HTMLAudioElement | null;

    if (audio) {
      isMusicPlaying ? audio.play() : audio.pause();
      audio.volume = musicVolume;
    }
  }, [isMusicPlaying, musicVolume]);

  return (
    <audio id="background-music" src="/Space.mp3" loop>
      Your browser does not support the audio element.
    </audio>
  );
};

export default Audio;
