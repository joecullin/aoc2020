#!/usr/bin/env node

const yargs = require('yargs/yargs');
const argv = yargs(process.argv.slice(2)).argv;

if (!argv.puzzle){
    console.error("missing puzzle parameter!");
    process.exit(1); 
}
let puzzleId = argv.puzzle.toString();
if (puzzleId.length === 3){
    puzzleId = '0' + puzzleId;
}
const solutionPath = `./solutions/${puzzleId}`;
const solution = require(solutionPath);

let params = {
    inputPath: "./inputs/01.1.txt",
};
if (argv.input){
    params.inputPath = argv.input;
}

solution.run(params);
