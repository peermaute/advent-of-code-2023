import * as fs from 'fs';

const getLinesFromFile = (path: string) => {
  const lines = fs.readFileSync(path, 'utf-8');
  return lines.split('\r\n');
}

export const easyTestInput = ["eightwothree"];

export const difficultActualInput = getLinesFromFile("./input.txt");
