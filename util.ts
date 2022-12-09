import fs from 'fs';
import readline from 'readline';

export function createReadlineInterface(path: string): readline.Interface {
    return readline.createInterface({
        input: fs.createReadStream(path),
        crlfDelay: Infinity,
    });
}

/**
 * Intersect arrays
 */
export function intersect<T1 extends Array<number>, T2 extends Array<number>>(
    arr1: T1,
    arr2: T2,
): Array<number> {
    return arr1.filter((x) => arr2.includes(x));
}

/**
 * Create range from 0...n
 */
export function range(start: number, stop: number, step: number = 1) {
    return Array.from(
        {length: (stop - start) / step + 1},
        (_, i) => start + i * step,
    );
}
