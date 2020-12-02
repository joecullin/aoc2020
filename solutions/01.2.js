const logger = require("../common/logger-simple");
const {readLinesNumeric} = require("../common/readInput");

const run = async (params) => {
    const input = await readLinesNumeric({inputPath: params.inputPath});
    let done = false;
    for (let i=0; i<input.length; i++){
        for (let j=1; j<input.length; j++){
            for (let k=2; k<input.length; k++){
                if (2020 === (input[i] + input[j] + input[k])){
                    console.log(`${input[i]} + ${input[j]} + ${input[k]} is 2020!`);
                    const answer = input[i] * input[j] * input[k];
                    console.log("answer: " + answer);
                    done = true;
                    break;
                }
            }
        }
        if (done){
            break;
        }
    }
};

module.exports = { run };
