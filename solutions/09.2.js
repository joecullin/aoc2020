const logger = require("../common/logger-simple");
const {readLinesNumeric} = require("../common/readInput");

const run = async (params) => {
    const input = await readLinesNumeric({inputPath: params.inputPath});
    let done = false;
    const windowSize = 25;

    let target;
    for (let i=windowSize; i<input.length; i++){
        let preceding = input.slice(i-windowSize, i);
        target = input[i];

        let good = false;
        for (let j=0; j<preceding.length; j++){
            for (let k=1; k<preceding.length; k++){
                if (target === (preceding[j] + preceding[k])){
                    good = true;
                }
            }
        }
        if (!good){ break; }
    }

    for (let i=0; i<input.length; i++){
        let sum = 0;
        for (let j=i; j<input.length; j++){
            sum += input[j];
            if (sum === target){
                const sorted = input.slice(i,j+1).sort((a,b) => b-a);
                const answer = sorted[0] + sorted[sorted.length-1];
                console.log(`found it at positions ${i} to ${j}: ${answer}`);
                process.exit(0);
            }
        }
    }
};

module.exports = { run };
