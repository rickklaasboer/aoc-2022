import {Interface as ReadLineInterface} from 'readline';

import {createReadlineInterface} from '../util';

const FILE_PATH = __dirname + '/data.txt';

async function createGrid(readLines: ReadLineInterface) {
    const lines: number[][] = [];

    for await (const line of readLines) {
        lines.push(line.split('').map(Number));
    }

    return lines;
}

/**
 * Get row of grid
 */
function getRow(grid: number[][], index: number): number[] {
    return grid[index];
}

/**
 * Get column of grid
 */
function getColumn(grid: number[][], index: number): number[] {
    return grid.map((x) => x[index]);
}

/**
 * Check if tree is visible
 */
function isVisible(grid: number[][], i: number, j: number): boolean {
    const rowIsValid =
        getRow(grid, i)[j] > Math.max(...getRow(grid, i).slice(0, j)) ||
        getRow(grid, i)[j] > Math.max(...getRow(grid, i).slice(j + 1));

    const columnIsValid =
        getColumn(grid, j)[i] > Math.max(...getColumn(grid, j).slice(0, i)) ||
        getColumn(grid, j)[i] > Math.max(...getColumn(grid, j).slice(i + 1));

    return rowIsValid || columnIsValid;
}

/**
 * Get scenic score of point
 */
function getScenicScore(grid: number[][], i: number, j: number): number {
    const current = grid[i][j];

    const left = getRow(grid, i).slice(0, j).reverse();
    const right = getRow(grid, i).slice(j + 1);

    const up = getColumn(grid, j).slice(0, i).reverse();
    const down = getColumn(grid, j).slice(i + 1);

    return [left, up, right, down]
        .map((line) => {
            if (Math.max(...line) < current) {
                return line.length;
            }
            return line.findIndex((t) => t >= current) + 1;
        })
        .reduce((x, y) => x * y, 1);
}

async function partOne() {
    const grid = await createGrid(createReadlineInterface(FILE_PATH));

    // Get initital start of sum (all edges combined - 4 for corner correction)
    let sum = (getRow(grid, 0).length + getColumn(grid, 0).length) * 2 - 4;

    for (let i = 1; i < grid.length - 1; i++) {
        for (let j = 1; j < getColumn(grid, 0).length - 1; j++) {
            if (isVisible(grid, i, j)) {
                sum++;
            }
        }
    }

    return sum;
}

async function partTwo() {
    const grid = await createGrid(createReadlineInterface(FILE_PATH));

    const sums: number[] = [];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < getColumn(grid, 0).length; j++) {
            sums.push(getScenicScore(grid, i, j));
        }
    }

    return Math.max(...sums);
}

Promise.all([partOne(), partTwo()]).then(console.log);
