const {readLinesNumeric} = require("../common/readInput");

const run = async (params) => {
    const input = await readLinesNumeric({inputPath: params.inputPath});
    let sorted = input.sort((a,b) => a-b);
    console.log("sorted: " + sorted.join(','));

    let allPathCounts = sorted.reduce((pathCounts, currentValue) => {
        pathCounts[currentValue] = (pathCounts[currentValue-1] || 0) + (pathCounts[currentValue-2] || 0) + (pathCounts[currentValue-3] || 0);
        return pathCounts;
    }, [1]);

    console.log("answer: ", allPathCounts.pop());
};

module.exports = { run };
