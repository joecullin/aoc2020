
const {readLinesNumeric} = require("../common/readInput");

const run = async (params) => {
    const input = await readLinesNumeric({inputPath: params.inputPath});
    let done = false;
    for (let i=0; i<input.length; i++){
        for (let j=1; j<input.length; j++){
            if (2020 === (input[i] + input[j])){
                console.log(`${input[i]} + ${input[j]} is 2020!`);
                const answer = input[i] * input[j];
                console.log("answer: " + answer);
                done = true;
                break;
            }
        }
        if (done){
            break;
        }
    }
};

module.exports = { run };
