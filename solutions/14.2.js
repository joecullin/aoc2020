const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});
    const lineRegex = /^([a-z]+)[=\][ ]+([0-9X]+)\D*(\d*)$/;

    let verbose = false;
    let memory = {};
    let currentMask = {};

    const resolveVariations = (addresses) => {
        if (addresses[0].indexOf("X") === -1){
            return addresses;
        }
        let newAddresses = [];
        addresses.forEach(address => {
            newAddresses.push(address.replace("X", "0"));
            newAddresses.push(address.replace("X", "1"));
        });
        return resolveVariations(newAddresses);
    };

    input.forEach(instruction => {
        if (verbose) { console.log("------"); }
        const parsed = instruction.match(lineRegex);
        if (parsed[1] === "mask"){
            const mask = parsed[2];
            if (verbose) { console.log("mask", mask); }
            currentMask = {};
            mask.split('').forEach( (maskValue, position) => {
                currentMask[position] = maskValue==="X" ? "X" : parseInt(maskValue);
            });
        }
        else if (parsed[1] === "mem"){
            const address = parsed[2];
            const inputValue = parseInt(parsed[3]);
            if (verbose) { console.log(`mem[${address}]: ${inputValue}`); }

            let addressBinary = parseInt(address).toString(2).padStart(36, "0");
            let binaryDigits = [...addressBinary];

            if (verbose) { console.log("memory address before mask: " + binaryDigits.join('')); }
            if (verbose) { console.log("                mask value: " + Object.values(currentMask).join('')); }

            Object.entries(currentMask).forEach( ([position, maskValue]) => {
                if (maskValue === 1 || maskValue === "X"){
                    binaryDigits[position] = maskValue;
                }
            });
            if (verbose) { console.log("                after mask: " + binaryDigits.join('')); }
            resolveVariations([binaryDigits.join('')]).forEach(address => {
                const addressDecimal = parseInt(address, 2);
                memory[addressDecimal] = inputValue;
                if (verbose) { console.log(`${address} memory[${addressDecimal}]: ${inputValue}`); }
            });
        }
    });
    const answer = Object.values(memory).reduce( (acc, cur) => acc + cur, 0);
    console.log("Answer: " + answer);
};

module.exports = { run };
