import { findLCMForArray, splitArrayByEmptyLine } from "../utils/utils";

type NavigationMap = {
  [key: string]: {
    L: string;
    R: string;
  };
};

type NavigationGhostMap = {
  [key: string]: {
    L: {
      value: string;
      endsWithZ: boolean;
    };
    R: {
      value: string;
      endsWithZ: boolean;
    };
    endsWithA: boolean;
  };
};

const getNavigationMap = (input: string[]): NavigationMap => {
  const navigationMap: NavigationMap = {};
  input.forEach((line: string) => {
    const [key, values] = line.split(" = ");
    const [left, right] = values.split(",");
    navigationMap[key.trim()] = {
      L: left.substring(1, 4),
      R: right.substring(1, 4),
    };
  });
  return navigationMap;
};

const getNavigationGhostMap = (input: string[]): NavigationGhostMap => {
  const navigationGhostMap: NavigationGhostMap = {};
  input.forEach((line: string) => {
    const [key, values] = line.split(" = ");
    const [left, right] = values.split(",");
    const leftValue = left.substring(1, 4);
    const rightValue = right.substring(1, 4);
    navigationGhostMap[key.trim()] = {
      L: {
        value: leftValue,
        endsWithZ: leftValue.endsWith("Z"),
      },
      R: {
        value: rightValue,
        endsWithZ: rightValue.endsWith("Z"),
      },
      endsWithA: key.trim().endsWith("A"),
    };
  });
  return navigationGhostMap;
};

const getSteps = (
  instructions: string[],
  navigationMap: NavigationMap
): number => {
  let steps = 0;
  let currentNode = "AAA";
  let index = 0;
  while (true) {
    const instruction = instructions[index];
    const { L, R } = navigationMap[currentNode];
    currentNode = instruction === "L" ? L : R;
    steps++;
    if (currentNode === "ZZZ") {
      break;
    }
    index++;
    if (index >= instructions.length) {
      index = 0;
    }
  }
  return steps;
};

const getGhostSteps = (
  instructions: string[],
  navigationGhostMap: NavigationGhostMap
): number => {
  let startNodes = Object.keys(navigationGhostMap).filter(
    (key: string) => navigationGhostMap[key].endsWithA
  );
  const cycles = getCycles(startNodes, instructions, navigationGhostMap);
  const lowestCommonMultiple = findLCMForArray(cycles);
  return lowestCommonMultiple;
};

const getCycles = (
  nodes: string[],
  instructions: string[],
  navigationGhostMap: NavigationGhostMap
): number[] => {
  const cycles: number[] = [];
  for (const node of nodes) {
    const visitsOfZNodes = getVisitsOfZNodes(
      node,
      instructions,
      navigationGhostMap
    );
    cycles.push(getCycle(visitsOfZNodes));
  }
  return cycles;
};

const getCycle = (visitsOfZNodes: number[]): number => {
  const cycles: number[] = [];
  // check if all are
  visitsOfZNodes.forEach((visit: number) => {
    if (visit % visitsOfZNodes[0] !== 0) {
      console.log("NOT A CYCLE");
    }
  });
  return visitsOfZNodes[0];
};

const getVisitsOfZNodes = (
  node: string,
  instructions: string[],
  navigationGhostMap: NavigationGhostMap
): number[] => {
  let steps = 0;
  let currentNode = node;
  let instructionIndex = 0;
  const visitsOfZNodes: number[] = [];
  for (let i = 0; i < 100000; i++) {
    const instruction = instructions[instructionIndex];
    const { L, R } = navigationGhostMap[currentNode];
    const currentNodeObject = instruction === "L" ? L : R;
    currentNode = currentNodeObject.value;
    steps++;
    if (currentNodeObject.endsWithZ) {
      visitsOfZNodes.push(steps);
    }
    instructionIndex++;
    if (instructionIndex >= instructions.length) {
      instructionIndex = 0;
    }
  }
  return visitsOfZNodes;
};

export const partOne = (input: string[]) => {
  const [instructionsInput, navigationInput] = splitArrayByEmptyLine(input);
  const instructions = instructionsInput.flatMap((instructionLine: string) =>
    instructionLine.split("")
  );
  const navigationMap = getNavigationMap(navigationInput);
  const steps = getSteps(instructions, navigationMap);
  console.log(steps, "STEPS");
};

export const partTwo = (input: string[]) => {
  const [instructionsInput, navigationInput] = splitArrayByEmptyLine(input);
  const instructions = instructionsInput.flatMap((instructionLine: string) =>
    instructionLine.split("")
  );
  const navigationGhostMap = getNavigationGhostMap(navigationInput);
  const steps = getGhostSteps(instructions, navigationGhostMap);
  console.log(steps, "STEPS");
};
