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
    console.log("tiles:", tiles);

    let tileEdges = {};
    tiles.forEach(tile => {
        tileEdges[tile.id] = tile.edges;
    });
    // make sure we have a full reverse mapping of reversed. ugh this is getting ugly.
    Object.entries(reversed).forEach( ([key, val]) => {
        reversed[val] = parseInt(key);
    });
    console.log("tiles", tileEdges);
    console.log("reversed", reversed);

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
    console.log("compatibleTiles", compatibleTiles);

    let gridWidth = Math.sqrt(tiles.length);

    const findGoodTileOrder = (remainingOptions, tileOrder, targetLength, depth) => {
        // console.log(`findGoodTileOrder. so far: ${tileOrder.join(",")}`);

        if (tileOrder.length > 1){
            const lastTileIndex = tileOrder.length-1;
            const tile = tileOrder[lastTileIndex];
            if (lastTileIndex % gridWidth !== 0){
                const leftNeighbor = tileOrder[lastTileIndex-1];
                if (!compatibleTiles[leftNeighbor].find(record => record.otherTile === tile)){
                    return [];
                }
            }
            if (lastTileIndex > gridWidth){
                const topNeighbor = tileOrder[lastTileIndex-gridWidth];
                if (!compatibleTiles[topNeighbor].find(record => record.otherTile === tile)){
                    return [];
                }
            }
        }

        for (let i=0; i<remainingOptions.length; i++){
            if (depth===0){
                console.log(`${i}...`);
            }

            let tryNext = findGoodTileOrder(
                remainingOptions.filter(tile => tile !== remainingOptions[i] && !tileOrder.includes[tile]),
                [...tileOrder, remainingOptions[i]],
                targetLength,
                depth+1,
            );
            if (tryNext.length){
                return tryNext;
            }
        }

        if (tileOrder.length === targetLength){
            return tileOrder;
        }
        return [];
    };

    const sortedByEdges = Object.keys(compatibleTiles).sort( (a,b) => compatibleTiles[a].length - compatibleTiles[b].length );
    const tileOrder = findGoodTileOrder(sortedByEdges, [], sortedByEdges.length, 0).reverse(); // reverse so I can compare to sample
    console.log("tileOrder:", tileOrder);

    const rotateTile = (tile, turnsRight) => {
        let rotated = [...tile];
        for (let i=0; i<turnsRight; i++){
            rotated = [
                reversed[rotated[3]],
                rotated[0],
                reversed[rotated[1]],
                rotated[2],
            ];
        }
        return rotated;
    };

    const flipVertical = (tile) => {
        return [
            tile[2],
            reversed[tile[1]],
            tile[0],
            reversed[tile[3]],
        ];
    };

    const flipHorizontal = (tile) => {
        return [
            reversed[tile[0]],
            tile[3],
            reversed[tile[2]],
            tile[1],
        ];
    };

    const tileContents = (textOrig, rotations, flipVertical, flipHorizontal, dontChop) => {
        let text = [...textOrig];
        for (let i=0; i<rotations; i++){
            let newText = text.map( () => "");
            text.reverse().forEach(row => {
                const pixels = row.split('');
                pixels.forEach( (pixel, newRow) => {
                    newText[newRow] += pixel;
                });
            });
            text = [...newText];
        }
        if (flipVertical){
            text = text.reverse();
        }
        if (flipHorizontal){
            text = text.map(row => {
                return row.split('').reverse().join('');
            });
        }

        // chop off borders
        if (!dontChop){
            text.shift();     
            text.pop();     
            text = text.map(row => {
                let newRow = row.split('');
                newRow.shift();
                newRow.pop();
                return newRow.join('');
            });
        }

        return text;
    };

    const firstRightBorder = compatibleTiles[tileOrder[0]].find(record => record.otherTile === tileOrder[1]);
    let firstTileRotation = 1 - firstRightBorder.edge;
    let firstTileAlignment = rotateTile(tileEdges[tileOrder[0]], firstTileRotation);
    firstTileAlignment = flipVertical(firstTileAlignment);
    let tileLayout = [{
        tile: tileOrder[0],
        alignment: firstTileAlignment,
        rotations: firstTileRotation,
        flip: true,
        text: tileContents(tiles.find(thisTile => thisTile.id === parseInt(tileOrder[0])).text, firstTileRotation, true, false),
    }];

    // finish out the top row
    for (let i=1; i<gridWidth; i++){
        const tile = tileOrder[i];
        const leftBorder = tileLayout[i-1].alignment[1];
        let alignment = tileEdges[tile];
        let rotations;
        let flip = false;
        for (let j=0; j<=3; j++){
            console.log(`tile ${i} ${tile} (${j})`, alignment);
            if (leftBorder === alignment[3]){
                rotations = j;
                break;
            }
            else if (reversed[leftBorder] === alignment[3]){
                rotations = j;
                flip = true;
                break;
            }
            alignment = rotateTile(alignment, 1);
        }
        if (flip){
            alignment = flipVertical(alignment);
        }
        tileLayout.push({
            tile,
            alignment,
            rotations,
            flip,
            text: tileContents(tiles.find(thisTile => thisTile.id === parseInt(tile)).text, rotations, flip, false),
        });
    }

    // remaining rows
    for (let i=gridWidth; i<tileOrder.length; i++){
        const tile = tileOrder[i];
        const topBorder = tileLayout[i-gridWidth].alignment[2];
        let alignment = tileEdges[tile];
        let rotations;
        let flip = false;
        for (let j=0; j<=3; j++){
            console.log(`tile ${i} ${tile} (${j})`, alignment);
            if (topBorder === alignment[0]){
                rotations = j;
                break;
            }
            else if (reversed[topBorder] === alignment[0]){
                rotations = j;
                flip = true; 
                break;
            }
            alignment = rotateTile(alignment, 1);
        }
        if (flip){
            alignment = flipHorizontal(alignment);
        }
        tileLayout.push({
            tile,
            alignment,
            rotations,
            flip,
            text: tileContents(tiles.find(thisTile => thisTile.id === parseInt(tile)).text, rotations, false, flip),
        });
    }

    console.log(tileLayout);

    let tileWidth = tileLayout[0].text.length;

    let image = [];
    for (let tileRow=0; tileRow<gridWidth; tileRow++){
        console.log(`tileRow ${tileRow}`);
        for (let row=0; row<tileWidth; row++){
            const imageRowNum = (tileRow*tileWidth) + row;
            console.log(`row: ${row} imageRowNum ${imageRowNum}`);
            let imageRow = "";
            for (let tileCol=0; tileCol<gridWidth; tileCol++){
                console.log(`getting tile ${(tileRow*gridWidth) + tileCol}`);
                const text = tileLayout[ (tileRow*gridWidth) + tileCol ].text;
                // imageRow += "  " + text[row];
                imageRow += text[row];
            }
            image[imageRowNum] = imageRow;
        }
        // image[(tileRow*tileWidth) + (tileWidth-1)] += "\n";
    }

    let perspectives = [];
    for (let i=0; i<3; i++){
        perspectives.push(tileContents(image, i, false, false, true));
        perspectives.push(tileContents(image, i, true, false, true));
    }

// I'm good up to here. Now I need to find my monsters.

// doh! -- this would only work for an image the same width as the monster (20 chars).

// Should I walk through the whole grid pixel by pixel looking for a monster?
// Should I find the middle and then look ahead and behind?
// Should I subdivide into smaller width images and use the below regex?


    const monster = /#_0#____##____##____###0_#__#__#__#__#__#/g;
    for (let i=0; i<perspectives.length; i++){
        const image = perspectives[i];
        // console.log(image.join("\n"));
        const checkImage = image.join("0").replace(/[.]/g, '_');
        console.log("\nchecking", checkImage);
        if (monster.test(image)){
            console.log(`Found monsters!`);
            break;
        }
    }



};


module.exports = { run };
