import { difficultActualInput } from "./input";
import { isNumber } from "../utils/utils";

type Number = {
  number: number;
  startIndex: number;
  endIndex: number;
};

type Line = {
  numbers: Number[];
  symbolIndexes: Set<number>;
};

const getLine = (lineString: string) => {
  const line: Line = { numbers: [], symbolIndexes: new Set<number>() };
  let currentNumberString = "";
  let currentStartIndex = 0;
  for (let i = 0; i < lineString.length; i++) {
    const char = lineString[i];
    if (isNumber(char)) {
      if (currentNumberString === "") currentStartIndex = i;
      currentNumberString += char;
      continue;
    }
    if (currentNumberString !== "") {
      const number = createNumber(currentNumberString, currentStartIndex, i);
      line.numbers.push(number);
      currentNumberString = "";
    }
    if (char !== ".") line.symbolIndexes.add(i);
  }
  if (currentNumberString !== "") {
    const number = createNumber(
      currentNumberString,
      currentStartIndex,
      lineString.length
    );
    line.numbers.push(number);
  }
  return line;
};

const createNumber = (
  numberString: string,
  startIndex: number,
  endIndex: number
) => {
  return {
    number: parseInt(numberString),
    startIndex,
    endIndex,
  };
};

const getTotal = (lines: Line[]) => {
  let total = 0;
  lines.forEach((line, index) => {
    const previousLine = index > 0 ? lines[index - 1] : null;
    const nextLine = index < lines.length - 1 ? lines[index + 1] : null;
    total += getLineSum(line, previousLine, nextLine);
  });
  return total;
};

const getLineSum = (
  line: Line,
  previousLine: Line | null,
  nextLine: Line | null
) => {
  let sum = 0;
  const lineSymbols = line.symbolIndexes;
  const previousLineSymbols = previousLine ? previousLine.symbolIndexes : null;
  const nextLineSymbols = nextLine ? nextLine.symbolIndexes : null;
  line.numbers.forEach((number) => {
    if (
      hasAdjacentSymbol(
        lineSymbols,
        previousLineSymbols,
        nextLineSymbols,
        number
      )
    ) {
      sum += number.number;
      // console.log("number " + number.number);
    }
  });
  return sum;
};

const hasAdjacentSymbol = (
  lineSymbols: Set<number>,
  previousLineSymbols: Set<number> | null,
  nextLineSymbols: Set<number> | null,
  number: Number
) => {
  if (
    lineSymbols.has(number.startIndex - 1) ||
    lineSymbols.has(number.endIndex)
  )
    return true;
  if (
    previousLineSymbols !== null &&
    adjacentLineHasSymbolInRange(
      previousLineSymbols,
      number.startIndex,
      number.endIndex
    )
  )
    return true;
  if (
    nextLineSymbols !== null &&
    adjacentLineHasSymbolInRange(
      nextLineSymbols,
      number.startIndex,
      number.endIndex
    )
  )
    return true;
  return false;
};

const adjacentLineHasSymbolInRange = (
  adjacentLineSymbols: Set<number>,
  startIndex: number,
  endIndex: number
) => {
  for (let i = startIndex - 1; i < endIndex + 1; i++) {
    if (adjacentLineSymbols.has(i)) return true;
  }
  return false;
};

const partOne = () => {
  const lines: Line[] = [];
  difficultActualInput.forEach((line: string) => {
    console.log(line);
    const lineObject = getLine(line);
    console.log(lineObject);
    lines.push(lineObject);
  });
  const total = getTotal(lines);
  console.log("Total: " + total);
};

partOne();
