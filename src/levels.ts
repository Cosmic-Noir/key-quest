const ALL_LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP".split("");
const ALL_NUMBERS = "1234567890".split("");
const ALL_SYMBOLS = "`~!@#$%^&*()-_=+\[]{};:,.<>/?".split("");

const SMALL_WORDS = [
  "Oh",
  "Ah",
  "Zzz",
  "Star",
  "Moon",
  "Gas",
  "Core",
  "Beam",
  "Ship",
  "Suit",
  "Dock",
  "Map",
  "Gear",
  "Base",
  "Fizz",
  "Pop"
];

const MEDIUM_WORDS = [
  "Asteroid",
  "Meteoroid",
  "Crater",
  "Fragment",
  "Debris",
  "Orbiting",
  "Gravity",
  "Impact",
  "Velocity",
  "Ellipse",
  "Galactic",
  "Cosmos",
  "Telescope",
  "Cosmos",
  "Satellite",
  "Trajectory"
];

const LONG_WORDS = [
  "Interstellar",
  "Gravitational",
  "Astrophysics",
  "Extraterrestrial",
  "Spectroscopy",
  "Cosmological",
  "Electromagnetic",
  "Heliocentric",
  "Thermodynamics",
  "Astrobiology",
];

const SPECIAL_WORDS = [
  "@stronomy",
  "*Galaxy*",
  "#Comet#",
  "$$Satellite$$",
  "%%Nebula%%",
  "^Orbit^",
  "&Cluster&",
  "*Quasar*",
  "#BlackHole#",
  "$$Supernova$$",
  "%%Cosmos%%",
  "^Meteorite^",
  "&Alien&",
  "*Spaceport*",
  "#Gravity#",
  "$$Eclipse$$",
  "%%Asteroid%%",
  "^Photon^",
  "&Wormhole&",
  "*Pulsar*"
];

const ALL_WORDS = [
  ...SMALL_WORDS,
  ...MEDIUM_WORDS,
  ...LONG_WORDS,
  ...SPECIAL_WORDS
];

const ALL_CHARACTERS = [
  ...ALL_LETTERS,
  ...ALL_NUMBERS,
  ...ALL_SYMBOLS
];

function generateRandomNumberStrings(numbersArray: string[], numOfStrings: number): string[] {
  let stringsArray = [];

  for (let j = 0; j < numOfStrings; j++) {
    // Determine the length of the resulting string (between 3 and 6)
    const lengthOfString = Math.floor(Math.random() * 5) + 2;

    let resultString = '';
    for (let i = 0; i < lengthOfString; i++) {
      // Pick a random index from the numbersArray
      const randomIndex = Math.floor(Math.random() * numbersArray.length);
      // Add the number at the randomIndex to the resultString
      resultString += numbersArray[randomIndex];
    }

    stringsArray.push(resultString);
  }

  return stringsArray;
}

const levels = [
  {
    name: "Training Station",
    words: SMALL_WORDS,
    letters: ALL_LETTERS,
    img: '/trainingStation.png' 
  },
  {
    name: "Lexicon Asteroid Belt",
    words: MEDIUM_WORDS,
    letters: ALL_LETTERS,
    img: '/lexiconBelt.png'
  },
  {
    name: "Nebula of Numbers",
    words: generateRandomNumberStrings(ALL_NUMBERS, 25),
    letters: ALL_NUMBERS,
    img: '/nebula.png'
  },
  {
    name: "Interstellar Symbol Decryption",
    words: SPECIAL_WORDS,
    letters: ALL_SYMBOLS,
    img: '/symbols.png'
  },
  {
    name: "Galactic Core",
    words: ALL_WORDS,
    letters: ALL_CHARACTERS,
    img: '/core.png'
  }
];
 
export default levels;