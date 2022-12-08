import fs from "fs";

function solve(signal: string, count: number) {
  for (let i = 0; i <= signal.length - count; i++) {
    const set = new Set(signal.substring(i, i + count));
    if (set.size === count) {
      return i + count;
    }
  }
}

const file = fs.readFileSync(__dirname + "/data.txt").toString();
console.log([solve(file, 4), solve(file, 14)]);
