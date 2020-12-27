const {readLines} = require("../common/readInput");

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

    let tileEdges = {};
    tiles.forEach(tile => {
        tileEdges[tile.id] = tile.edges;
    });

    // pre-filter a list of compatible tile edges
    let compatibleTiles = {};
    Object.keys(tileEdges).forEach(tile => {
        let compatibleEdges = [];
        tileEdges[tile].forEach( (edge, i) => {
            Object.keys(tileEdges).filter(otherTile => otherTile !== tile).forEach(otherTile => {
                tileEdges[otherTile].forEach( (otherEdge, j) => {
                    if (edge === otherEdge){
                        compatibleEdges.push({
                            otherTile,
                            edge: i,
                            otherEdge: j,
                            reversed: false,
                        });
                    }
                    else if (edge === reversed[otherEdge]){
                        compatibleEdges.push({
                            otherTile,
                            edge: i,
                            otherEdge: j,
                            reversed: true,
                        });
                    }
                });
            });
        });
        compatibleTiles[tile] = compatibleEdges;
    });

    // hah! it turns out there are only 4 tiles with 2 compatible edges --> those have to be the corners.

    const corners = Object.keys(compatibleTiles).filter(tile => compatibleTiles[tile].length === 2);
    const answer = corners.reduce( (acc, cur) => acc * cur, 1);
    console.log(`answer: ${answer}`);
};


module.exports = { run };
