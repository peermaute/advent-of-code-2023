import { difficultActualInput, easyTestInput } from "./input";

const numbersSpelledOut = [
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'
]

const numbersSpelledOutMap : {[key:string]: number} = {
  'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
  'six': 6, 'seven': 7, 'eight': 8, 'nine': 9
}

const getLineValue = (line: string) => {
  let firstResultDigit: string | number = '';
  let secondResultDigit: string | number = '';
  for (let i = 0; i < line.length; i++) {
    if(firstResultDigit === ''){
      firstResultDigit = matchRestOfLine(line.slice(i));
    }
    else{
      const nextMatch = matchRestOfLine(line.slice(i));
      if(nextMatch === '') continue;
      secondResultDigit = nextMatch;
    }
  }
  if(secondResultDigit === '') secondResultDigit = firstResultDigit;
  return getResult(firstResultDigit, secondResultDigit);
}

const isNumber = (char: string) => {
  return !isNaN(parseInt(char));
}

const matchRestOfLine = (line: string) => {
  if(isNumber(line[0])){
    return line[0];
  }
  let possibleMatches = [...numbersSpelledOut];
  for(let i = 0; i < line.length; i++){
    const char = line[i];
    possibleMatches = possibleMatches.filter((match) => {
      return match[i] === char;
    });
    if(possibleMatches.length === 0) return '';
    if(possibleMatches.length === 1 && possibleMatches[0] in numbersSpelledOutMap && possibleMatches[0] === line.slice(0, i + 1)){
      return numbersSpelledOutMap[possibleMatches[0]];
    } 
  }
  return '';
}

const getResult = (firstResultDigit: string | number, secondResultDigit: string | number) => {
  console.log("First result: " + firstResultDigit);
  console.log("Second result: " + secondResultDigit);
  const resultString = `${firstResultDigit}${secondResultDigit}`;
  return parseInt(resultString);
}

let totalResult = 0;
difficultActualInput.forEach((line: string) => { 
  console.log(line);
  const result = getLineValue(line);
  console.log("Result: " + result + "\n")
  totalResult += result;
});
console.log("TOTAL RESULT: " + totalResult);
