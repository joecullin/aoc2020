const logger = require("../common/logger-simple");
const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    let validCount = 0;
    const lineRegex = /^(\d+)-(\d+) (\w): (\w+)/;    

    for (let i=0; i<input.length; i++){
        const found = input[i].match(lineRegex);
        if (found){
            const pos1 = found[1];
            const pos2 = found[2];
            const letter = found[3];
            const password = found[4];

            const letters = password.split('');
            let matches = (letters[pos1-1] === letter ? 1 : 0) +
                          (letters[pos2-1] === letter ? 1 : 0);

            if (matches === 1){
                validCount++;
            }
        }
    }
    console.log("Valid count: " + validCount);
};

module.exports = { run };
