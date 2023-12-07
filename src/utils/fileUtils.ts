import fs from "fs";

export const getLinesFromFile = (path: string) => {
  const lines = fs.readFileSync(path, "utf-8");
  return lines.split("\r\n");
};
