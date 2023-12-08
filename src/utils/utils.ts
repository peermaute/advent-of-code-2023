export const isNumber = (value: string): boolean => {
  return !isNaN(parseInt(value));
};

export const splitArrayByEmptyLine = (array: string[]): string[][] => {
  const resultArray: string[][] = [];
  let tempArray: string[] = [];
  array.forEach((item) => {
    if (item === "") {
      resultArray.push(tempArray);
      tempArray = [];
    } else {
      tempArray.push(item);
    }
  });
  resultArray.push(tempArray);
  return resultArray;
};

export function findLCMForArray(numbers: number[]): number {
  // Calculate the greatest common divisor (GCD) using Euclidean algorithm
  const calculateGCD = (x: number, y: number): number => {
    while (y !== 0) {
      const temp = y;
      y = x % y;
      x = temp;
    }
    return x;
  };

  // Calculate the LCM of two numbers
  const calculateLCM = (a: number, b: number): number => {
    const gcd = calculateGCD(a, b);
    return (a * b) / gcd;
  };

  // Iterate through the array and calculate LCM iteratively
  let lcmResult = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    lcmResult = calculateLCM(lcmResult, numbers[i]);
  }

  return lcmResult;
}
