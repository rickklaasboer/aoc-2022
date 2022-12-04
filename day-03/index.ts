import { createReadlineInterface } from "../util";
import fs from "fs";

// Generate alphabet
const x = Array.from(Array(26))
  .map((_, i) => i + 65)
  .map((x) => String.fromCharCode(x));
const alphabet = `${x.join("").toLowerCase()}${x.join("")}`;

function toChunks(arr: any[], chunkSize: number) {
  const res: any[] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

function getPriority(char: string): number {
  return 1 + alphabet.indexOf(char);
}

async function partOne(): Promise<number> {
  const lines = createReadlineInterface(__dirname + "/data.txt");
  let total = 0;

  for await (const line of lines) {
    const [first, second] = [
      line.substring(0, line.length / 2),
      line.substring(line.length / 2),
    ];

    const match = [
      // Remove duplicates
      ...new Set(
        Array.from(first)
          .map((x) => (second.includes(x) ? x : null))
          .filter(Boolean)
      ),
    ][0]!;

    total += getPriority(match);
  }

  return total;
}

async function partTwo(): Promise<number> {
  const readlines = createReadlineInterface(__dirname + "/data.txt");
  const lines: string[] = [];
  let total = 0;

  for await (const line of readlines) {
    lines.push(line);
  }

  const chunked = toChunks(lines, 3);

  for (const chunk of chunked) {
    let matched: string[] = [];
    for (const char of Array.from(chunk[0])) {
      if (
        chunk[1].includes(char) &&
        chunk[2].includes(char) &&
        !matched.includes(char as string)
      ) {
        matched.push(char as string);
        total += getPriority(char as string);
      }
    }
    matched = [];
  }

  return total;
}

// [ 7785, 2633 ]
Promise.all([partOne(), partTwo()]).then(console.log);
