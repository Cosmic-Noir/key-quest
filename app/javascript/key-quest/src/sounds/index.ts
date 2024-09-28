import dingSoundAudio from 'assets/ding.wav';
import fizzleSoundAudio from 'assets/fizzle.wav';

export const dingSound = (volume: GLfloat) => {
  const dingSound = new Audio(dingSoundAudio);
  dingSound.volume = volume;
  dingSound.play();
};

export const fizzleSound = (volume: GLfloat) => {
  const fizzleSound = new Audio(fizzleSoundAudio);
  fizzleSound.volume = volume;
  fizzleSound.play();
};