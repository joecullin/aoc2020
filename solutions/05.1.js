
const {readLines} = require("../common/readInput");

const traverse = (spec, bottom, top) => {
    spec.forEach(direction => {
        const half = ((top - bottom) + 1) / 2;
        if (direction === 'U'){
            bottom += half;
        }
        else{
            top -= half;
        }
    });
    const result = spec[spec.length-1] === 'U' ? top : bottom;
    return result;
};


const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});
    const passes = input.map(record => {
        let pass = {};
        // replace B/R with U (up) and F/L with D (down)
        pass.rowSpec = record.slice(0,7).replace(/B/g,'U').replace(/F/g,'D').split('');
        pass.colSpec = record.slice(7).replace(/R/g,'U').replace(/L/g,'D').split('');
        pass.row = traverse(pass.rowSpec, 0, 127);
        pass.col = traverse(pass.colSpec, 0, 7);
        pass.id = (pass.row * 8) + pass.col;
        return pass;
    });
    passes.sort((a,b) => b.id - a.id);
    // console.log(passes);
    console.log("highest id pass:", passes[0]);
};

module.exports = { run };
