const logger = require("../common/logger-simple");
const {readLines} = require("../common/readInput");

const checkRoute = (params) => {
    let x = 0
    let y = 0;
    let treeCount = 0;
    while (y < params.grid.length){
        const row = params.grid[y];
        if (row[x] === '#'){
            treeCount++;
        }

        y += params.route.yStep;
        x += params.route.xStep;
        if (x >= row.length){
            let xOrig = x;
            x = x - row.length;
        }
    }
    return treeCount;
};

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});
    const grid = input.map(line => {
        return line.trim().split('');
    });
    let routes = [
        {yStep: 1, xStep: 1},
        {yStep: 1, xStep: 3},
        {yStep: 1, xStep: 5},
        {yStep: 1, xStep: 7},
        {yStep: 2, xStep: 1},
    ];
    const trees = routes.map(route => checkRoute({grid, route}));
    console.log(trees);
    const reducer = (accumulator, currentValue) => accumulator * currentValue;
    const answer = trees.reduce(reducer, 1);
    console.log("answer: " + answer);

};

module.exports = { run };
