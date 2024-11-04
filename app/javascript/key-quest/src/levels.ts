import trainingStationImg from 'assets/trainingStation.png';
import lexiconBeltImg from 'assets/lexiconBelt.png';
import nebulaImg from 'assets/nebula.png';
import symbolsImg from 'assets/symbols.png';
import coreImg from 'assets/core.png';

import spaceProbeImg from 'assets/spaceProbe.png';
import planet1Img from 'assets/planet1.png';
import planet2Img from 'assets/planet2.png';
import spaceStationImg from 'assets/spaceStation.png';
import asteroid2Img from 'assets/asteroid2.png';
import asteroidsImg from 'assets/asteroids.png';
import asteroidImg from 'assets/asteroid.png';
import nebula1Img from 'assets/nebula1.png';
import crystal1Img from 'assets/crystal1.png';

const ALL_LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP".split("");
const ALL_NUMBERS = "1234567890".split("");
const ALL_SYMBOLS = "`~!@#$%^&*()-_=+[]{};:,.<>/?".split("");

const LEVEL_ONE_WORDS = {
  easy: [
    "Star",
    "Moon",
    "Gas",
    "Core",
    "Beam",
    "Ship",
    "Suit",
    "Dock",
    "Map",
    "Base"
  ],
  medium: [
    "Rocket",
    "Launch",
    "Module",
    "Orbit",
    "Engine",
    "Pilot",
    "Solar",
    "Radar",
    "Hatch",
    "Flight"
  ],
  hard: [
    "Astronautical",
    "Microgravity",
    "Hydroponics",
    "Astrodynamics",
    "Spacewalk",
    "Telemetry",
    "Astrophotography",
    "Extravehicular",
    "Thermosphere",
    "Gravitational"
  ]
};

const LEVEL_TWO_WORDS = {
  easy: [
    "Star",
    "Moon",
    "Mars",
    "Orbit",
    "Comet",
    "Dust",
    "Gas",
    "Rock",
    "Crater",
    "Void"
  ],
  medium: [
    "Asteroid",
    "Meteor",
    "Galaxy",
    "Eclipse",
    "Gravity",
    "Satellite",
    "Spectrum",
    "Cluster",
    "Cosmic",
    "Orbital"
  ],
  hard: [
    "Astrophysics",
    "Exoplanetary",
    "Interstellar",
    "Astronomical",
    "Gravitational",
    "Celestial",
    "Thermosphere",
    "Spectroscopy",
    "Meteoritical",
    "Heliocentric"
  ]
};

const LEVEL_FOUR_WORDS = {
  easy: [
    "Pl@net",
    "St)r",
    "G@laxy",
    "C(met",
    "M*on",
    "Orb^t",
    "Sp-ce",
    "E+rth",
    "A$tro",
    "Ali=n"
  ],
  medium: [
    "Cosm!c",
    "T3l3port",
    "Gr@vit%",
    "N3bul@",
    "Qu@sa#",
    "G@lact^c",
    "M3t3or",
    "Sat3ll!te",
    "Ast3r*id",
    "Sp@cecr@ft"
  ],
  hard: [
    "Int%rst%ll@r",
    "Extr@t3rr3stri@l",
    "T3chn*l*gy",
    "Crypt^gr@phy",
    "T3l3sc)pic",
    "Hyp3rsp@c3",
    "Astrophys!cs",
    "Electr0m@gnetic",
    "Micr0gr@vity",
    "Spectr0sc0py"
  ]
};

const LEVEL_FIVE_WORDS = {
  easy: [
    "St@r",
    "M00n",
    "C0met",
    "Orb!t",
    "Nebul@",
    "G@laxy",
    "Ecl!pse",
    "Ast3r",
    "Pl@net",
    "Qu@sar"
  ],
  medium: [
    "T3leport",
    "Grav!ty",
    "Cosm0s",
    "Sp@tial",
    "Gal@ctic",
    "Stell@r",
    "Puls@r",
    "V0rtex",
    "Meteor!",
    "Interst@r"
  ],
  hard: [
    "Extrat3rr3strial",
    "Astrophys!cs",
    "Gravit@ti0nal",
    "Interg@lactic",
    "Celesti@lMech",
    "Supern0v@Expl",
    "Electrom@gnetism",
    "QuantumMech@nics",
    "Cosmolog!calC0re",
    "Hypersp@ceNavig"
  ]
};

const ALL_CHARACTERS = [
  ...ALL_LETTERS,
  ...ALL_NUMBERS,
  ...ALL_SYMBOLS
];

function generateNumberStrings(
  charactersArray: string[], 
  numOfStringsPerDifficulty: number
): { easy: string[]; medium: string[]; hard: string[] } {
  const easyStrings: string[] = [];
  const mediumStrings: string[] = [];
  const hardStrings: string[] = [];

  // Define the length of strings for each difficulty
  const easyLength = 3;
  const mediumLength = 5;
  const hardLength = 7;

  for (let j = 0; j < numOfStringsPerDifficulty * 3; j++) {
    let lengthOfString: number;
    let targetArray: string[];

    if (j < numOfStringsPerDifficulty) {
      lengthOfString = easyLength;
      targetArray = easyStrings;
    } else if (j < numOfStringsPerDifficulty * 2) {
      lengthOfString = mediumLength;
      targetArray = mediumStrings;
    } else {
      lengthOfString = hardLength;
      targetArray = hardStrings;
    }

    let resultString = '';
    for (let i = 0; i < lengthOfString; i++) {
      const randomIndex = Math.floor(Math.random() * charactersArray.length);
      resultString += charactersArray[randomIndex];
    }

    targetArray.push(resultString);
  }

  return {
    easy: easyStrings,
    medium: mediumStrings,
    hard: hardStrings
  };
}

const LEVEL_THREE_WORDS = generateNumberStrings(ALL_NUMBERS, 10); 

export type Difficulty = 'easy' | 'medium' | 'hard';

interface LevelWords {
  easy: string[];
  medium: string[];
  hard: string[];
}

interface Level {
  name: string;
  words: LevelWords; // Use Difficulty type here
  letters: string[]; 
  img: string;
  levelImages?: string[]; // Optional array of strings for level-specific images
}

const levels: Level[] = [
  {
    name: "Training Station",
    words: LEVEL_ONE_WORDS,
    letters: ALL_LETTERS,
    img: `assets/${trainingStationImg}`,
    levelImages: [
      `/${spaceProbeImg}`,
      `/${planet1Img}`,
      `/${planet2Img}`,
      `/${spaceStationImg}`,
      `/${planet2Img}`
    ]
  },
  {
    name: "Lexicon Asteroid Belt",
    words: LEVEL_TWO_WORDS,
    letters: ALL_LETTERS,
    img: `assets/${lexiconBeltImg}`,
    levelImages: [
      `/${asteroid2Img}`,
      `/${asteroidsImg}`,
      `/${asteroidImg}`,
      `/${asteroidImg}`,
      `/${asteroidsImg}`
    ]
  },
  {
    name: "Nebula of Numbers",
    words: LEVEL_THREE_WORDS,
    letters: ALL_NUMBERS,
    img: `assets/${nebulaImg}`,
    levelImages: [
      `/${nebula1Img}`,
      `/${nebula1Img}`,
      `/${nebula1Img}`,
      `/${nebula1Img}`,
      `/${nebula1Img}`
    ]
  },
  {
    name: "Interstellar Symbol Decryption",
    words: LEVEL_FOUR_WORDS,
    letters: ALL_SYMBOLS,
    img: `assets/${symbolsImg}`,
    levelImages: [
      `/${crystal1Img}`,
      `/${crystal1Img}`,
      `/${crystal1Img}`,
      `/${crystal1Img}`,
      `/${crystal1Img}`
    ]
  },
  {
    name: "Galactic Core",
    words: LEVEL_FIVE_WORDS,
    letters: ALL_CHARACTERS,
    img: `assets/${coreImg}`
  }
];

export default levels;
