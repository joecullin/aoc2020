const logger = require("../common/logger-simple");
const {readLinesNumeric} = require("../common/readInput");

const run = async (params) => {
    const input = await readLinesNumeric({inputPath: params.inputPath});
    let done = false;
    const windowSize = 25;

    for (let i=windowSize; i<input.length; i++){
        let preceding = input.slice(i-windowSize, i);
        let target = input[i];

        let good = false;
        for (let j=0; j<preceding.length; j++){
            for (let k=1; k<preceding.length; k++){
                if (target === (preceding[j] + preceding[k])){
                    good = true;
                }
            }
        }
        if (!good){
            console.log(`no good at ${target}`);
            break;
        }
    }
};

module.exports = { run };
