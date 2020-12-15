const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});
    const lineRegex = /^([a-z]+)[=\][ ]+([0-9X]+)\D*(\d*)$/;

    let memory = {};
    let currentMask = {};

    input.forEach(instruction => {
        const parsed = instruction.match(lineRegex);
        if (parsed[1] === "mask"){
            const mask = parsed[2];
            currentMask = {};
            mask.split('').forEach( (maskValue, position) => {
                if (maskValue !== "X"){
                    currentMask[position] = parseInt(maskValue);
                }
            });
        }
        else if (parsed[1] === "mem"){
            const memLocation = parsed[2];
            const inputValue = parsed[3];

            let valueBinary = parseInt(inputValue).toString(2).padStart(36, "0");
            let binaryDigits = [...valueBinary];

            Object.entries(currentMask).forEach( ([position, maskValue]) => {
                binaryDigits[position] = maskValue;
            });

            const newValue = parseInt(binaryDigits.join(''), 2);
            memory[memLocation] = newValue;
        }
    });

    const answer = Object.values(memory).reduce( (acc, cur) => acc + cur, 0);
    console.log("Answer: " + answer);
};

module.exports = { run };
