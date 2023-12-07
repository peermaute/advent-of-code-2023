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
