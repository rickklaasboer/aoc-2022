import fs from 'fs';
import {EOL} from 'os';

const lines: (string | number)[][] = fs
    .readFileSync(__dirname + '/data.txt')
    .toString()
    .split(EOL)
    .map((a) => a.split(' '))
    .map((move) => [move[0], parseInt(move[1])]);

const DIRECTIONS_URDL = {
    U: [0, -1],
    R: [1, 0],
    D: [0, 1],
    L: [-1, 0],
};

function getVisitedPositions(length: number, moves: (string | number)[][]) {
    const set = new Set();
    const rope = Array.from({length}, () => [0, 0]);

    for (const [direction, steps] of moves) {
        for (let i = 0; i < steps; i++) {
            const key = direction as keyof typeof DIRECTIONS_URDL;
            rope[0] = [
                rope[0][0] + DIRECTIONS_URDL[key][0],
                rope[0][1] + DIRECTIONS_URDL[key][1],
            ];

            for (let j = 1; j < length; j++) {
                const directionX = rope[j - 1][0] - rope[j][0];
                const directionY = rope[j - 1][1] - rope[j][1];

                if (Math.abs(directionX) > 1) {
                    rope[j][0] += directionX > 0 ? 1 : -1;

                    if (directionY !== 0) {
                        rope[j][1] += directionY > 0 ? 1 : -1;
                    }
                } else if (Math.abs(directionY) > 1) {
                    rope[j][1] += directionY > 0 ? 1 : -1;

                    if (directionX !== 0) {
                        rope[j][0] += directionX > 0 ? 1 : -1;
                    }
                }
            }

            set.add(rope[length - 1].join('-'));
        }
    }

    return set.size;
}

console.log({
    partOne: getVisitedPositions(2, lines),
    partTwo: getVisitedPositions(10, lines),
});
