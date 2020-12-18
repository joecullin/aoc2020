const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    const solveSimple = (expression) => {
        let tokens = expression.split(' ');
        let result = tokens.shift();
        for (let i=0; i<tokens.length-1; i+=2){
            let operator = tokens[i];
            let operand = tokens[i+1];
            result = eval(`${result} ${operator} ${operand}`);
        }
        return result;
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
