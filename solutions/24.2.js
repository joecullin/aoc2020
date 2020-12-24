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

    const follow = (directions, coords) => {
        let position = {x: 0, y: 0};
        if (coords){
            const [x,y] = coords.split(",").map(val => Number(val));
            position = {x,y};
        }
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
        return `${position.x},${position.y}`;
    };

    let allNeighbors = new Map();
    const getNeighbors = (coords) => {
        const cached = allNeighbors.get(coords);
        if (cached){
            return cached;
        }
        const neighbors = ["e", "w", "ne", "nw", "se", "sw"].map(direction => follow([direction], coords));
        allNeighbors.set(coords, neighbors);
        return neighbors;
    };

    let tiles = new Map();
    tileDirections.forEach(directions => {
        const coords = follow(directions);
        let tile = tiles.get(coords);
        tile = (!tile || tile==="w") ? "b" : "w";
        tiles.set(coords, tile);
    });

    const flip = () => {
        // figure out the boundaries of our floor by getting all neighbors.
        tiles.forEach( (_,coords) => {
            getNeighbors(coords);
        });
        let xMin = 0; let xMax = 0; let yMin = 0; let yMax = 0;
        let allCoords = [...allNeighbors.keys()];
        allCoords.forEach(coords => {
            const [x,y] = coords.split(",").map(val => Number(val));
            if (x < xMin){ xMin = x; }
            if (x > xMax){ xMax = x; }
            if (y < yMin){ yMin = y; }
            if (y > yMax){ yMax = y; }
        });
        // we'll look at an area one step larger than all current neighbors.
        xMin--; xMax++; yMin--; yMax++;

        let turnBlack = [];
        let turnWhite = [];
        for (let x=xMin; x<=xMax; x+=.5){
            for (let y=yMin; y<=yMax; y++){
                const coords = [x,y].join(",");

                const yEven = (y % 2 !== 0);
                const xFraction = (x % 1 !== 0);
                let validCoords = ( (yEven && xFraction) || (!yEven && !xFraction) );
                if (!validCoords){
                    continue;
                }

                let tile = tiles.get(coords);
                const neighborCoords = getNeighbors(coords);
                const blackNeighborCount = neighborCoords.map(coords => tiles.get(coords)).filter(tile => tile === "b").length; 
                if (tile === "b"){
                    if (blackNeighborCount === 0 || blackNeighborCount > 2){
                        turnWhite.push(coords);
                    }
                }
                else if (blackNeighborCount === 2){
                    turnBlack.push(coords);
                }
            }
        }
        turnWhite.forEach(coords => { tiles.set(coords, "w") });
        turnBlack.forEach(coords => { tiles.set(coords, "b") });
    }

    for (let day=0; day<100; day++){
        flip();
        let answer = [...tiles.values()].filter(tile => tile === "b").length;
        console.log(`day ${day+1} answer: ${answer}`);
    }

};

module.exports = { run };
