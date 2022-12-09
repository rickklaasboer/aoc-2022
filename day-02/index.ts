import fs from 'fs';
import readline from 'readline';

const POSSIBLE_OUTCOMES_PART_ONE = {
    'A X': 4,
    'A Y': 8,
    'A Z': 3,

    'B X': 1,
    'B Y': 5,
    'B Z': 9,

    'C X': 7,
    'C Y': 2,
    'C Z': 6,
};

const POSSIBLE_OUTCOMES_PART_TWO = {
    'A X': 3,
    'A Y': 4,
    'A Z': 8,

    'B X': 1,
    'B Y': 5,
    'B Z': 9,

    'C X': 2,
    'C Y': 6,
    'C Z': 7,
};

async function calculateScore(input: Record<string, number>) {
    const lines = readline.createInterface({
        input: fs.createReadStream(__dirname + '/data.txt'),
        crlfDelay: Infinity,
    });

    let score = 0;

    for await (const line of lines) {
        const key = line as keyof typeof input;
        score += input[key];
    }

    return score;
}

// [ 14375, 10274 ]
Promise.all([
    calculateScore(POSSIBLE_OUTCOMES_PART_ONE),
    calculateScore(POSSIBLE_OUTCOMES_PART_TWO),
]).then(console.log);
