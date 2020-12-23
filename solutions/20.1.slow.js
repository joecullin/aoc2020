const {readLines} = require("../common/readInput");

// This only takes a few seconds on the sample input, and gets the right answer.
// Never going to finish on the real input though.

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    let reversed = {}; // for storing the flipped version of each edge

    // Translate each edge to a decimal number, for easy comparison.
    const serializeEdges = (tile) => {
        const top = tile[0].split('');
        const bottom = tile[tile.length-1].split('');
        const left = tile.map(row => row[0]);
        const right = tile.map(row => row[row.length-1]);
        const computeEdge = (edge) => {
            // binary string: #'s are 1s, .'s are 0s.
            const serialized = parseInt(edge.map(pixel => pixel==="#" ? 1 : 0).join(''), 2);
            reversed[serialized] = parseInt(edge.map(pixel => pixel==="#" ? 1 : 0).reverse().join(''), 2);
            return serialized;
        };
        return [
            computeEdge(top),
            computeEdge(right),
            computeEdge(bottom),
            computeEdge(left),
        ];
    };

    let tiles = [];
    let inputBuffer = [];
    for (let i=0; i<input.length; i++){
        inputBuffer.push(input[i]);
        if (input[i].trim() === "" || i === input.length-1){
            const id = parseInt(inputBuffer.shift().replace(/\D/g, ''));
            if (i < input.length-1){
                inputBuffer.pop();  // blank separator line
            }
            tiles.push({
                id,
                text: [...inputBuffer],
                edges: serializeEdges(inputBuffer),
            });
            inputBuffer = [];
        }
    }
    // console.log(tiles);

    let tileEdges = {};
    tiles.forEach(tile => {
        tileEdges[tile.id] = tile.edges;
    });
    console.log("tiles", tileEdges);

    let gridWidth = Math.sqrt(tiles.length);

    const rotatedTile = (tileId, rotation) => {
            const tile = [...tileEdges[tileId]];
            if (rotation === 0){
                return [ ...tile ];
            }
            else if (rotation === 1){
                return [ reversed[tile[3]], tile[0], reversed[tile[1]], tile[2] ];
            }
            else if (rotation === 2){
                return [ reversed[tile[2]], reversed[tile[3]], reversed[tile[0]], reversed[tile[1]] ];
            }
            else if (rotation === 3){
                return [ tile[1], reversed[tile[2]], tile[3], reversed[tile[0]] ];
            }
            else if (rotation === 4){
                return [ tile[2], reversed[tile[1]], tile[0], reversed[tile[3]] ];
            }
            else if (rotation === 5){
                return [ reversed[tile[1]], reversed[tile[0]], reversed[tile[3]], reversed[tile[2]] ];
            }
            else if (rotation === 6){
                return [ reversed[tile[0]], tile[3], reversed[tile[2]], tile[1] ];
            }
            else if (rotation === 7){
                return [ tile[3], tile[2], tile[1], tile[0] ];
            }
    };

    const isGoodRotationSequence = (tileOrder, rotationSequence) => {
        const tileCount = rotationSequence.length;

        if (tileCount < 2 || !rotationSequence.length){
            return true;
        }
        let i = tileCount - 1;
        const thisTile = rotatedTile(tileOrder[i], rotationSequence[i]);

        // compare this tile to the one on its left
        if (i % gridWidth !== 0){
            const leftNeighbor = rotatedTile(tileOrder[i-1], rotationSequence[i-1]);
            if (leftNeighbor[1] !== thisTile[3]){
                return false;
            }
        }
        // compare this tile to the one above it
        if (i > gridWidth){
            const topNeighbor = rotatedTile(tileOrder[i-gridWidth], rotationSequence[i-gridWidth]);
            if (topNeighbor[2] !== thisTile[0]){
                return false;
            }
        }

        // console.log("rotated======", rotated);
        return true;
    };

    const findGoodSequences = (alphabet, tileOrder, rotationSequence, targetLength) => {
        if (isGoodRotationSequence(tileOrder, rotationSequence)){
            if (targetLength === rotationSequence.length){
                return rotationSequence;
            }
    
            for (let i=0; i<alphabet.length; i++){
                let tryNext = findGoodSequences(alphabet, tileOrder, [...rotationSequence, alphabet[i]], targetLength);
                if (tryNext.length){
                    return tryNext;
                }
            }
        }
        return [];
    };

    const findGoodTileOrder = (alphabet, tileOrder, targetLength, depth) => {

        const good = findGoodSequences([0,1,2,3,4,5,6,7], tileOrder, [], tileOrder.length);
        if (good && good.length === targetLength){
            return tileOrder;
        }

        for (let i=0; i<alphabet.length; i++){
            if (depth===0){
                console.log(`${i}...`);
            }
            let tryNext = findGoodTileOrder(
                alphabet.filter(tile=>tile!==alphabet[i]), // like an inverse splice - everything but element i
                [...tileOrder, alphabet[i]],
                targetLength,
                depth+1,
            );
            if (tryNext.length){
                return tryNext;
            }
        }
        return [];
    };

    const good = findGoodTileOrder([...tiles.map(tile => tile.id)], [], 9, 0);
    console.log("final:", good);

    const topLeft = good[0];
    const topRight = good[gridWidth-1];
    const bottomRight = good[good.length-1];
    const bottomLeft = good[good.length-gridWidth];
    const answer = topLeft * topRight * bottomRight * bottomLeft;
    console.log(`answer: ${answer}`);
};


module.exports = { run };
