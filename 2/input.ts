import * as fs from 'fs';

const getLinesFromFile = (path: string) => {
  const lines = fs.readFileSync(path, 'utf-8');
  return lines.split('\r\n');
}

export const easyTestInput = ["Game 1: 2 red, 2 green; 1 red, 1 green, 2 blue; 3 blue, 3 red, 3 green; 1 blue, 3 green, 7 red; 5 red, 3 green, 1 blue"];

export const difficultActualInput = getLinesFromFile("./input.txt");
