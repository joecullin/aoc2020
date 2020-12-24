const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    let tileDirections = [];
    input.forEach(line => {
        let directions = [];
        let i=0;
        while (i < line.length){
            if (["n","s"].includes(line[i])){
                directions.push(`${line[i]}${line[i+1]}`);
                i++;
            }
            else{
                directions.push(line[i]);
            }
            i++;
        }
        tileDirections.push(directions);
    });

    const follow = (directions) => {
        let position = {x: 0, y: 0};
        directions.forEach(direction => {
            switch (direction) {
                case 'e':
                    position.x += 1;
                    break;
                case 'w':
                    position.x -= 1;
                    break;
                case 'ne':
                    position.y += 1;
                    position.x += .5;
                    break;
                case 'nw':
                    position.y += 1;
                    position.x -= .5;
                    break;
                case 'se':
                    position.y -= 1;
                    position.x += .5;
                    break;
                case 'sw':
                    position.y -= 1;
                    position.x -= .5;
                    break;
                default:
                    console.log(`invalid direction ${direction}`);
            }
        });
        return `${position.x}:${position.y}`;
    };

    let tiles = new Map();
    tileDirections.forEach(directions => {
        const coords = follow(directions);
        let tile = tiles.get(coords);
        tile = (tile==="w" || !tile) ? "b" : "w";
        tiles.set(coords, tile);
    });

    let answer = [...tiles.values()].filter(tile => tile === "b").length;
    console.log(`answer: ${answer}`);
};

module.exports = { run };
