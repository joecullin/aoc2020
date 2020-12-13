const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    const directions = {0: "N", 1: "E", 2: "S", 3: "W"};
    let facing = 1;  // start facing E.
    let position = [0,0];

    input.forEach(instruction => {
        console.log(`=============== ${instruction}`);
        let action = instruction[0];
        if (action === "F"){
            action = directions[facing];
        }
        const actionValue = parseInt(instruction.replace(/./, ''));
        if (action === "L" || action === "R"){
            let turn = (actionValue/90) * (action==="L" ? -1 : 1);
            facing = (4 + facing + turn) % 4;
            console.log(`${instruction}: turn to ${directions[facing]}`);
        }
        else if (action === "N"){
            position[0] += actionValue;
        }
        else if (action === "S"){
            position[0] -= actionValue;
        }
        else if (action === "E"){
            position[1] += actionValue;
        }
        else if (action === "W"){
            position[1] -= actionValue;
        }
        console.log(`Now at ${position[0]} x ${position[1]} facing ${directions[facing]}`);
    });

    const answer = Math.abs(position[0]) + Math.abs(position[1]);
    console.log("Answer: " + answer);
};

module.exports = { run };
