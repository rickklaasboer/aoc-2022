import fs from "fs";
import readline from "readline";

export function createReadlineInterface(path: string): readline.Interface {
  return readline.createInterface({
    input: fs.createReadStream(path),
    crlfDelay: Infinity,
  });
}
