import { splitArrayByEmptyLine } from "../utils/utils";
import { getLinesFromFile } from "../utils/fileUtils";

const difficultActualInput = getLinesFromFile("./input.txt");

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

const getSeedsWithRanges = (seeds: number[]): number[] => {
  const seedsWithRanges: number[] = [];
  for (let i = 0; i < seeds.length - 1; i += 2) {
    for (let j = 0; j < seeds[i + 1]; j++) {
      seedsWithRanges.push(seeds[i] + j);
    }
  }
  return seedsWithRanges;
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

/**
 * This is my solution for part 2. It is not optimized and I had a memory overload so I used a different approach to get the solution.
 * I am fairly certain that this solution would work theoretically.
 */
const partTwo = () => {
  const [seedsInput, ...sourceDestinationMapsInput] =
    splitArrayByEmptyLine(difficultActualInput);
  const seeds: number[] = getSeeds(seedsInput);
  const seedsWithRanges = getSeedsWithRanges(seeds);
  const sourceDestinationMaps: sourceDestinationMap[] =
    getSourceDestinationMaps(sourceDestinationMapsInput);
  const seedLocations: number[] = [];
  seedsWithRanges.forEach((seed) => {
    const seedLocation: number = getSeedLocation(seed, sourceDestinationMaps);
    seedLocations.push(seedLocation);
  });
  const lowestSeedLocation: number = Math.min(...seedLocations);
  console.log("Lowest Seed Location: " + lowestSeedLocation);
};
