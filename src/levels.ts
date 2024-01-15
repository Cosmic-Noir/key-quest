const ALL_LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP".split("");
const ALL_NUMBERS = "1234567890".split("");
const ALL_SYMBOLS = "`~!@#$%^&*()-_=+[]{};:,.<>/?".split("");

const LEVEL_ONE_WORDS = [
  "Star",
  "Moon",
  "Gas",
  "Core",
  "Beam",
  "Ship",
  "Suit",
  "Dock",
  "Map",
  "Base",
  "Rocket",
  "Launch",
  "Module",
  "Orbit",
  "Engine",
  "Pilot",
  "Solar",
  "Radar",
  "Hatch",
  "Flight",
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
];

const LEVEL_TWO_WORDS = [
  "Star",
  "Moon",
  "Mars",
  "Orbit",
  "Comet",
  "Dust",
  "Gas",
  "Rock",
  "Crater",
  "Void",
  "Asteroid",
  "Meteor",
  "Galaxy",
  "Eclipse",
  "Gravity",
  "Satellite",
  "Spectrum",
  "Cluster",
  "Cosmic",
  "Orbital",
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
];

const LEVEL_FOUR_WORDS = [
  "Pl@net",
  "St)r",
  "G@laxy",
  "C(met",
  "M*on",
  "Orb^t",
  "Sp-ce",
  "E+rth",
  "A$tro",
  "Ali=n",
  "Cosm!c",
  "T3l3port",
  "Gr@vit%",
  "N3bul@",
  "Qu@sa#",
  "G@lact^c",
  "M3t3or",
  "Sat3ll!te",
  "Ast3r*id",
  "Sp@cecr@ft",
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
];

const LEVEL_FIVE_WORDS = [
  "St@r",
  "M00n",
  "C0met",
  "Orb!t",
  "Nebul@",
  "G@laxy",
  "Ecl!pse",
  "Ast3r",
  "Pl@net",
  "Qu@sar",
  "T3leport",
  "Grav!ty",
  "Cosm0s",
  "Sp@tial",
  "Gal@ctic",
  "Stell@r",
  "Puls@r",
  "V0rtex",
  "Meteor!",
  "Interst@r",
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
];

const ALL_CHARACTERS = [
  ...ALL_LETTERS,
  ...ALL_NUMBERS,
  ...ALL_SYMBOLS
];

function generateRandomNumberStrings(numbersArray: string[], numOfStrings: number): string[] {
  let stringsArray: string[] = [];

  for (let j = 0; j < numOfStrings; j++) {
    let lengthOfString: number;

    if (j < 10) {
      lengthOfString = 3;
    } else if (j < 20) {
      lengthOfString = 5;
    } else {
      lengthOfString = 7;
    }

    let resultString: string = '';
    for (let i = 0; i < lengthOfString; i++) {
      const randomIndex: number = Math.floor(Math.random() * numbersArray.length);
      resultString += numbersArray[randomIndex];
    }

    stringsArray.push(resultString);
  }

  return stringsArray;
}

const levels = [
  {
    name: "Training Station",
    words: LEVEL_ONE_WORDS,
    letters: ALL_LETTERS,
    img: '/trainingStation.png' 
  },
  {
    name: "Lexicon Asteroid Belt",
    words: LEVEL_TWO_WORDS,
    letters: ALL_LETTERS,
    img: '/lexiconBelt.png'
  },
  {
    name: "Nebula of Numbers",
    words: generateRandomNumberStrings(ALL_NUMBERS, 30),
    letters: ALL_NUMBERS,
    img: '/nebula.png'
  },
  {
    name: "Interstellar Symbol Decryption",
    words: LEVEL_FOUR_WORDS,
    letters: ALL_SYMBOLS,
    img: '/symbols.png'
  },
  {
    name: "Galactic Core",
    words: LEVEL_FIVE_WORDS,
    letters: ALL_CHARACTERS,
    img: '/core.png'
  }
];
export default levels;