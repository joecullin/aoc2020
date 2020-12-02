const fs = require("fs")
const getStdin = require("get-stdin");

const readLinesNumeric = async (params) => {
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
    // console.log("input:", input);
    return input.split("\n").map(val => parseInt(val));
};

module.exports = {
  readLinesNumeric,
};
