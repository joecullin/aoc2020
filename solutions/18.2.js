const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    const solveSimple = (expression) => {
        let modified = expression;

        // solve all the additions first
        const addRegex = /\d+\s*[+-]\s*\d+/;
        while (addRegex.test(modified)){
            modified = modified.replace(addRegex, (addition) => {
                return eval(addition);
            });
        }

        // now everything is multiplication
        return modified.split(' ').filter(token => /^\d+$/.test(token)).reduce( (result, current) => {
            return current * result;
        }, 1);
    };

    const resolveParens = (expression) => {
        let modified = expression;

        // replace paren expressions from the inside out
        while (/[)]/.test(modified)){
            modified = modified.replace(/[(]([^)(]*)[)]/, (_,match) => {
                return solveSimple(match);
            });
        }

        return modified;
    };

    const solve = (expression) => {
        console.log(expression);
        let result = solveSimple(resolveParens(expression));
        console.log(result);
        return result;
    };

    const answer = input.reduce( (sum, expression) => sum + solve(expression), 0);
    console.log(`answer: ${answer}`);
};

module.exports = { run };
