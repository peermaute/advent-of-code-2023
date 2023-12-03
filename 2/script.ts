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

let totalValidGameValue = 0;
difficultActualInput.forEach((line: string) => {
  const game = getGame(line);
  console.log(game);
  if (isValidGame(game)) totalValidGameValue += game.id;
});
console.log("TOTAL VALID GAME VALUE: " + totalValidGameValue);
