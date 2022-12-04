import { createReadlineInterface, intersect, range } from "../util";

/**
 * Split lines by ',' and '-' and create ranges from resulting arrays
 */
function rangeFromLine(line: string): [number[], number[]] {
  const [part1, part2] = line.split(",");
  const [first, second] = [
    part1.split("-").map((x) => parseInt(x)),
    part2.split("-").map((x) => parseInt(x)),
  ];

  return [range(first[0], first[1]), range(second[0], second[1])];
}

async function partOne() {
  const lines = createReadlineInterface(__dirname + "/data.txt");

  let sum = 0;

  for await (const line of lines) {
    const [range1, range2] = rangeFromLine(line);

    if (
      range1.every((x) => range2.includes(x)) ||
      range2.every((x) => range1.includes(x))
    ) {
      sum++;
    }
  }

  return sum;
}

async function partTwo() {
  const lines = createReadlineInterface(__dirname + "/data.txt");

  let sum = 0;

  for await (const line of lines) {
    const [range1, range2] = rangeFromLine(line);

    if (intersect(range1, range2).length > 0) {
      sum++;
    }
  }

  return sum;
}

// [ 584, 933 ]
Promise.all([partOne(), partTwo()]).then(console.log);
