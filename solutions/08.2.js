const logger = require("../common/logger-simple");
const {readLines} = require("../common/readInput");

const program = (instructions) => {
    let acc = 0;
    let position = 0;
    let seen = {};
    while (1){
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
        // Throw error if we detect an infinite loop.
        if (seen[next]){
            throw Error("nope!");
        }
        position = next;
        // Break out of while loop if we're past the last instruction.
        if (position >= instructions.length){
            break;
        }
    }
    return acc;
}

const run = async (params) => {
    const instructions = await readLines({inputPath: params.inputPath});
    let answer;
    for (let i=0; i<instructions.length; i++){
        let modified;
        if (/^nop/.test(instructions[i])){
            modified = [...instructions];
            modified[i] = modified[i].replace('nop', 'jmp');
        }
        else if (/^jmp/.test(instructions[i])){
            modified = [...instructions];
            modified[i] = modified[i].replace('jmp', 'nop');
        }
        if (modified){
            try{
                answer = program(modified);
                // If an error wasn't thrown, that means we got a good answer.
                break; 
            }
            catch (error){ /* keep trying */ }
        }
    }
    console.log("answer: " + answer);
};

module.exports = { run };
