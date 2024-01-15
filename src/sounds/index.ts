export const dingSound = (volume: GLfloat) => {
  const dingSound = new Audio("/ding.wav");
  dingSound.volume = volume;
  dingSound.play();
};

export const fizzleSound = (volume: GLfloat) => {
  const fizzleSound = new Audio("/fizzle.wav");
  fizzleSound.volume = volume;
  fizzleSound.play();
};