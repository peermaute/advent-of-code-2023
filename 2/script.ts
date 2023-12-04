import { easyTestInput, difficultActualInput } from "./input";

const RED_TOTAL_CUBES = 12;
const GREEN_TOTAL_CUBES = 13;
const BLUE_TOTAL_CUBES = 14;

type Game = {
  id: number;
  rounds: {
    red: number;
    green: number;
    blue: number;
  }[];
};

const getGame = (gameString: string): Game => {
  const [idString, roundsString] = gameString.split(":");
  const id = parseInt(idString.replace("Game ", ""));
  const rounds = roundsString.split(";").map((round) => getRound(round));
  return {
    id,
    rounds,
  };
};

const getRound = (roundString: string) => {
  const colorStrings: string[] = roundString.split(",");
  let red = 0;
  let green = 0;
  let blue = 0;
  for (const colorString of colorStrings) {
    if (colorString.includes("red")) {
      red = parseInt(colorString.replace(" red", ""));
    }
    if (colorString.includes("green")) {
      green = parseInt(colorString.replace(" green", ""));
    }
    if (colorString.includes("blue")) {
      blue = parseInt(colorString.replace(" blue", ""));
    }
  }
  return {
    red,
    green,
    blue,
  };
};

const isValidGame = (game: Game) => {
  const { rounds } = game;
  for (const round of rounds) {
    if (round.red > RED_TOTAL_CUBES) return false;
    if (round.green > GREEN_TOTAL_CUBES) return false;
    if (round.blue > BLUE_TOTAL_CUBES) return false;
  }
  return true;
};

const getPowerOfSet = (game: Game) => {
  const { rounds } = game;
  let highestRed = -1;
  let highestGreen = -1;
  let highestBlue = -1;
  for (const round of rounds) {
    const { red, green, blue } = round;
    if (red !== 0 && (highestRed === -1 || red > highestRed)) highestRed = red;
    if (green !== 0 && (highestGreen === -1 || green > highestGreen))
      highestGreen = green;
    if (blue !== 0 && (highestBlue === -1 || blue > highestBlue))
      highestBlue = blue;
  }
  console.log("highest red: " + highestRed);
  console.log("highest green: " + highestGreen);
  console.log("highest blue: " + highestBlue);
  if (highestRed === -1) highestRed = 1;
  if (highestGreen === -1) highestGreen = 1;
  if (highestBlue === -1) highestBlue = 1;
  return highestRed * highestGreen * highestBlue;
};

const partOne = () => {
  let totalValidGameValue = 0;
  difficultActualInput.forEach((line: string) => {
    const game = getGame(line);
    console.log(game);
    if (isValidGame(game)) totalValidGameValue += game.id;
  });
  console.log("TOTAL VALID GAME VALUE: " + totalValidGameValue);
};

const partTwo = () => {
  let totalPowerOfSet = 0;
  difficultActualInput.forEach((line: string) => {
    const game = getGame(line);
    console.log(game);
    const powerOfSet = getPowerOfSet(game);
    console.log("Power of set: " + powerOfSet);
    totalPowerOfSet += powerOfSet;
  });
  console.log("TOTAL POWER OF SET: " + totalPowerOfSet);
};

partTwo();
