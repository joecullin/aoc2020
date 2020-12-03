const logger = require("../common/logger-simple");
const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    let validCount = 0;
    const lineRegex = /^(\d+)-(\d+) (\w): (\w+)/;    

    for (let i=0; i<input.length; i++){
        const found = input[i].match(lineRegex);
        if (found){
            const min = found[1];
            const max = found[2];
            const letter = found[3];
            const password = found[4];

            const letterCount = password.split('').filter(l => l===letter).length;

            if (letterCount >= min && letterCount <= max){
                validCount++;
            }
        }
    }
    console.log("Valid count: " + validCount);
};

module.exports = { run };
