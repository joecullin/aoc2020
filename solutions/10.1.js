const logger = require("../common/logger-simple");
const {readLinesNumeric} = require("../common/readInput");

const run = async (params) => {
    const input = await readLinesNumeric({inputPath: params.inputPath});
    const sorted = input.sort((a,b) => a-b);
    let differences = [];
    for (let i=1; i<sorted.length; i++){
        differences.push(input[i] - input[i-1]);
    }
    const d1 = differences.filter(d=>d===1).length + 1; // plus one to the outlet
    const d3 = differences.filter(d=>d===3).length + 1; // plus one to the device
    const answer = d1 * d3;
    console.log(`answer: ${answer}`);
};

module.exports = { run };
