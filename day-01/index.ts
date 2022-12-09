import fs from 'fs';
import readline from 'readline';

(async () => {
    const lines = readline.createInterface({
        input: fs.createReadStream(__dirname + '/data.txt'),
        crlfDelay: Infinity,
    });

    const data: number[] = [];
    let i = 0;

    for await (const line of lines) {
        if (line === '') {
            i++;
        }

        if (!data[i]) {
            data[i] = 0;
        }

        data[i] += parseInt(line);
    }

    const max = Math.max(...data);

    const sorted = data.sort((a, b) => b - a);
    const three = [sorted[0], sorted[1], sorted[2]].reduce((a, b) => a + b, 0);

    console.log({
        max,
        three,
    });
})();
