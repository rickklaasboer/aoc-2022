import { createReadlineInterface } from "../util";

// [P]     [C]         [M]
// [D]     [P] [B]     [V] [S]
// [Q] [V] [R] [V]     [G] [B]
// [R] [W] [G] [J]     [T] [M]     [V]
// [V] [Q] [Q] [F] [C] [N] [V]     [W]
// [B] [Z] [Z] [H] [L] [P] [L] [J] [N]
// [H] [D] [L] [D] [W] [R] [R] [P] [C]
// [F] [L] [H] [R] [Z] [J] [J] [D] [D]
//  1   2   3   4   5   6   7   8   9

const stacks = [
  ["F", "H", "B", "V", "R", "Q", "D", "P"],
  ["L", "D", "Z", "Q", "W", "V"],
  ["H", "L", "Z", "Q", "G", "R", "P", "C"],
  ["R", "D", "H", "F", "J", "V", "B"],
  ["Z", "W", "L", "C"],
  ["J", "R", "P", "N", "T", "G", "V", "M"],
  ["J", "R", "L", "V", "M", "B", "S"],
  ["D", "P", "J"],
  ["D", "C", "N", "W", "V"],
];

async function partOne() {
  const data = [...stacks];
  const lines = createReadlineInterface(__dirname + "/data.txt");

  for await (const line of lines) {
    const [count, from, to] = line
      .split(" ")
      .filter((x) => !isNaN(parseInt(x)))
      .map(Number);

    for (let i = 0; i < count; i++) {
      data[to - 1].push(data[from - 1].pop() ?? "");
    }
  }

  let result = "";

  for (const row of data) {
    const str = row[row.length - 1];
    result += str ? str : "";
  }

  return result;
}

async function partTwo() {
  const data = [...stacks];
  const lines = createReadlineInterface(__dirname + "/data.txt");

  // Shamelessly inspired by @Joehoel
  for await (const line of lines) {
    const [amount, from, to] = line
      .split(" ")
      .filter((x) => !isNaN(parseInt(x)))
      .map(Number);

    data[to - 1].push(...data[from - 1].splice(-amount));
  }

  return data
    .map((s) => s[s.length - 1])
    .join("")
    .replace(/[\[\]]/g, "");
}

Promise.all([partOne(), partTwo()]).then(console.log);
