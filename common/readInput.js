const fs = require("fs")
const getStdin = require("get-stdin");

const readLines = async (params) => {
    let input = "";
    if (params.inputPath){
        input = fs.readFileSync(params.inputPath).toString()
    }
    else{
        input = await getStdin();
    }
    if (typeof input !== "string" || input === ""){
        console.error("empty input?");
    }
    return input.split("\n");
};

const readLinesNumeric = async (params) => {
    return readLines(params).map(val => parseInt(val));
};


module.exports = {
  readLines,
  readLinesNumeric,
};
