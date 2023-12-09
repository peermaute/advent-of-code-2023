const getNextNumber = (line: number[]) => {
  const differences = getDifferences(line);
  const nextNumber =
    differences[differences.length - 1] + line[line.length - 1];
  return nextNumber;
};

const getDifferences = (line: number[]): number[] => {
  if (allValuesAreEqual(line)) return new Array(line.length).fill(0);
  const differences = [];
  for (let i = 0; i < line.length - 1; i++) {
    differences.push(line[i + 1] - line[i]);
  }
  const nextDifferences = getDifferences(differences);
  differences.push(
    differences[differences.length - 1] +
      nextDifferences[nextDifferences.length - 1]
  );
  console.log(differences, "differences");
  return differences;
};

const allValuesAreEqual = (line: number[]): boolean => {
  const value = line[0];
  for (let i = 1; i < line.length; i++) {
    if (line[i] !== value) return false;
  }
  return true;
};

const getResult = (inputLines: number[][]) => {
  let result = 0;
  inputLines.forEach((line) => {
    const nextNumber = getNextNumber(line);
    result += nextNumber;
  });
  return result;
};

export const partOne = (input: string[]) => {
  const inputLines = input.map((line) =>
    line.split(" ").map((n) => parseInt(n))
  );
  const result = getResult(inputLines);
  console.log(result, "result");
};

export const partTwo = (input: string[]) => {
  const inputLines = input.map((line) =>
    line.split(" ").map((n) => parseInt(n))
  );
  const reversedInputLines = inputLines.map((line) => line.reverse());
  const result = getResult(reversedInputLines);
  console.log(result, "result");
};
