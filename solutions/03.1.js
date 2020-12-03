const logger = require("../common/logger-simple");
const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});
    const grid = input.map(line => {
        return line.trim().split('');
    });

    let x = 0
    let y = 0;
    let treeCount = 0;
    while (y < grid.length){
        const row = grid[y];

        let rowCopy = [...row];
        rowCopy[x] = '!';
        console.log(rowCopy.join(' ') + ` (y=${y}, x=${x})`);
        if (row[x] === '#'){
            treeCount++;
        }

        y += 1;
        x += 3;
        if (x >= row.length){
            let xOrig = x;
            x = x - row.length;
            console.log(`shifted x from ${xOrig} to ${x}!`);
        }
    }
    console.log("treeCount: " + treeCount);
};

module.exports = { run };
