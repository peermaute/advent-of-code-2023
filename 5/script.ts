import { splitArrayByEmptyLine } from "../utils/utils";
import { difficultActualInput } from "./input";

type sourceDestinationEntry = {
  destination: number;
  source: number;
  range: number;
};

type sourceDestinationMap = {
  name: string;
  entries: sourceDestinationEntry[];
};

const getSeeds = (seedsInput: string[]): number[] => {
  const seedsString: string = seedsInput.join(" ");
  const seedNumbers: number[] = seedsString
    .split(":")[1]
    .trim()
    .split(" ")
    .map((item) => parseInt(item));
  return seedNumbers;
};

const getSourceDestinationMaps = (
  sourceDestinationMapsInput: string[][]
): sourceDestinationMap[] => {
  const sourceDestinationMaps: sourceDestinationMap[] = [];
  sourceDestinationMapsInput.forEach((input) => {
    const sourceDestinationMap: sourceDestinationMap = {
      name: input[0].split(":")[0],
      entries: [],
    };
    for (let i = 1; i < input.length; i++) {
      const [destination, source, range] = input[i]
        .split(" ")
        .map((item) => parseInt(item));
      sourceDestinationMap.entries.push({
        destination,
        source,
        range,
      });
    }
    sourceDestinationMaps.push(sourceDestinationMap);
  });
  return sourceDestinationMaps;
};

const getSeedLocation = (
  seed: number,
  sourceDestinationMaps: sourceDestinationMap[]
): number => {
  let currentDestination: number = seed;
  sourceDestinationMaps.forEach((sourceDestinationMap) => {
    currentDestination = getDestination(
      currentDestination,
      sourceDestinationMap
    );
  });
  return currentDestination;
};

const getDestination = (
  currentDestination: number,
  sourceDestinationMap: sourceDestinationMap
): number => {
  const sourceDestinationEntry: sourceDestinationEntry | undefined =
    sourceDestinationMap.entries.find(
      (entry) =>
        currentDestination >= entry.source &&
        currentDestination <= entry.source + entry.range
    );
  if (sourceDestinationEntry) {
    return (
      currentDestination -
      sourceDestinationEntry.source +
      sourceDestinationEntry.destination
    );
  }
  return currentDestination;
};

const partOne = () => {
  const [seedsInput, ...sourceDestinationMapsInput] =
    splitArrayByEmptyLine(difficultActualInput);
  const seeds: number[] = getSeeds(seedsInput);
  const sourceDestinationMaps: sourceDestinationMap[] =
    getSourceDestinationMaps(sourceDestinationMapsInput);
  const seedLocations: number[] = [];
  seeds.forEach((seed) => {
    const seedLocation: number = getSeedLocation(seed, sourceDestinationMaps);
    seedLocations.push(seedLocation);
  });
  const lowestSeedLocation: number = Math.min(...seedLocations);
  console.log("Lowest Seed Location: " + lowestSeedLocation);
};

partOne();
