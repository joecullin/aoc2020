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

const puzzleBase = puzzleId.replace(/[.].*/, '');
let params = {
    inputPath: `./inputs/${puzzleBase}.txt`,
};
if (argv.input){
    params.inputPath = argv.input;
}

solution.run(params);
