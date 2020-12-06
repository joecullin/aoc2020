const logger = require("../common/logger-simple");
const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});
    const answer = input.join("\n").split("\n\n")
    .reduce( (sum, group) => {
        return sum + (new Set(group.replace(/\s/g, '').split(''))).size;
    }, 0);
    console.log("Answer: " + answer);
};

module.exports = { run };
