import spaceCadetDiff from 'assets/spaceCadetDiff.png';
import orbitalOfficerDiff from 'assets/orbitalOfficerDiff.png';
import starVoyagerDiff from 'assets/starVoyagerDiff.png';

const DIFFICULTIES: Record<
  string,
  {
    [key: string]: Object;
    label: string;
    description: string;
    autoSpawnEnabled: boolean;
    spawnInterval: number;
    scrollSpeed: number;
    difficulty: string;
    scoreMultiplier: GLfloat;
    img: string;
  }
> = {
  easy: {
    label: "Space Cadet",
    description:
      "Embark on a leisurely journey through the cosmos, perfect for new typists. Navigate through fields of lowercase asteroids, encounter shorter cosmic words, and enjoy the slower drift of celestial bodies.",
    autoSpawnEnabled: false,
    spawnInterval: 1500,
    scrollSpeed: 11,
    difficulty: 'easy',
    scoreMultiplier: 1.0,
    img: spaceCadetDiff
  },
  medium: {
    label: "Orbital Officer",
    description:
      "Gear up for an interstellar challenge, ideal for experienced spacefarers. Encounter varied planetary landscapes with capitalization, longer alien words, and experience faster meteor showers of letters and words.",
    autoSpawnEnabled: true,
    spawnInterval: 1000,
    scrollSpeed: 8,
    difficulty: 'medium',
    scoreMultiplier: 1.5,
    img: orbitalOfficerDiff
  },
  hard: {
    label: "Space Voyager",
    description:
      "Dive into the heart of a typing galaxy, only for the bravest commanders. Brace for lightning-fast comet tails of really long words, quicksilver scrolling, and relentless generation of cosmic vocabulary.",
    autoSpawnEnabled: true,
    spawnInterval: 500,
    scrollSpeed: 5,
    difficulty: 'hard',
    scoreMultiplier: 2.0,
    img: starVoyagerDiff
  },
};

export default DIFFICULTIES;