import { difficultActualInput } from "../6/input";

type Game = {
  time: number;
  distance: number;
};

const getGames = (): Game[] => {
  const games: Game[] = [];
  const times = readInput(0);
  const distances = readInput(1);
  for (let i = 0; i < times.length; i++) {
    games.push({ time: times[i], distance: distances[i] });
  }
  return games;
};

const readInput = (lineNumber: number): number[] => {
  return difficultActualInput[lineNumber]
    .split(":")[1]
    .trim()
    .split(" ")
    .filter((string: string) => string !== "")
    .map((numString: string) => parseInt(numString));
};

const getWinPossibilities = ({ time, distance }: Game): number[] => {
  const winPossibilities: number[] = [];
  for (let secondsHeld = 1; secondsHeld < time; secondsHeld++) {
    const timeToTravel = time - secondsHeld;
    if (distance < timeToTravel * secondsHeld)
      winPossibilities.push(secondsHeld);
  }
  return winPossibilities;
};

const getLongGame = (): Game => {
  const time = parseInt(readInput(0).reduce((a: string, b) => a + b, ""));
  const distance = parseInt(readInput(1).reduce((a: string, b) => a + b, ""));
  return { time, distance };
};

const partOne = () => {
  const games = getGames();
  let result = 1;
  games.forEach((game: Game) => {
    const winPossobilities = getWinPossibilities(game);
    result *= winPossobilities.length;
  });
  console.log("RESULT: " + result);
};

const partTwo = () => {
  const game = getLongGame();
  const winPossobilities = getWinPossibilities(game);
  console.log("RESULT: " + winPossobilities.length);
};

partTwo();
