const logger = require("../common/logger-simple");
const {readLines} = require("../common/readInput");


const run = async (params) => {
    const instructions = await readLines({inputPath: params.inputPath});
    let acc = 0;
    let position = 0;
    let seen = {};
    let iterations = 0;
    while (1){
        iterations++;
        seen[position] = true;
        const [op, value] = instructions[position].split(' ');
        let next = position;
        if (op === "nop"){
            next = position +1;
        }
        else if (op === "acc"){
            acc = eval(`${acc} ${value}`);
            next = position +1;
        }
        else if (op === "jmp"){
            next = eval(`${position} ${value}`);
        }
        if (seen[next]){
            console.log("done. " + acc);
            break;
        }
        position = next;
    }
};

module.exports = { run };
