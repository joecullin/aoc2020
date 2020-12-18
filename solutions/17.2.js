const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});
    let grid = new Map();
    let xRange = [0,0];
    let yRange = [0,0];
    let zRange = [0,0];
    let wRange = [0,0];

    let inputLayer = new Map();
    input.forEach( (line, y) => {
        yRange[1] = y;
        let row = new Map();
        line.trim().split('').forEach( (val, x) => {
            if (val === "#"){
                xRange[1] = x;
                row.set(x, true);
            }
        });
        inputLayer.set(y, row);
    });
    let inputCube = new Map();
    inputCube.set(0, inputLayer);
    grid.set(0, inputCube);

    const getVal = (x,y,z,w) => {
        let val;
                
        const cube = grid.get(w);
        if (cube){
            const layer = cube.get(z);
            if (layer){
                const row = layer.get(y);
                if (row){
                    val = row.get(x);
                }
            }
        }
        return val;
    }

    const showGrid = () => {
        for (let w=wRange[0]; w<=wRange[1]; w++){
            for (let z=zRange[0]; z<=zRange[1]; z++){
                console.log(`z=${z}, w=${w}:`);
                const cube = grid.get(w);
                if (cube){
                    const layer = cube.get(z);
                    if (layer){
                        for (let y=yRange[0]; y<=yRange[1]; y++){
                            const row = layer.get(y);
                            let showRow = [];
                            for (let x=xRange[0]; x<=xRange[1]; x++){
                                let val;
                                if (row){
                                    val = row.get(x);
                                }
                                showRow.push(val ? '#' : '.');
                            }
                            console.log(showRow.join(' ') + `  ${y}`);
                        }
                    }
                }
            }
        }
    };
    console.log("starting grid:");
    showGrid();

    const getNeighbors = (x,y,z,w) => {
        let neighbors = [];
        for (let xDiff=-1;xDiff<=1;xDiff++){
            for (let yDiff=-1;yDiff<=1;yDiff++){
                for (let zDiff=-1;zDiff<=1;zDiff++){
                    for (let wDiff=-1;wDiff<=1;wDiff++){
                        let xNeighbor = x + xDiff;
                        let yNeighbor = y + yDiff;
                        let zNeighbor = z + zDiff;
                        let wNeighbor = w + wDiff;
                        if ( !(xNeighbor === x && yNeighbor === y && zNeighbor === z && wNeighbor === w) ){
                            neighbors.push([xNeighbor,yNeighbor,zNeighbor, wNeighbor]);
                        }
                    }
                }
            }
        }
        return neighbors;
    };

    const evalGrid = () => {
        let active = new Set();
        let inactive = new Set();
        let gridNew = new Map();
        let xRangeNew = [0,0];
        let yRangeNew = [0,0];
        let zRangeNew = [0,0];
        let wRangeNew = [0,0];

        const setActive = (x,y,z,w) => {
            if (!gridNew.has(w)){
                gridNew.set(w, new Map());
            }
            const cube = gridNew.get(w);
            if (!cube.has(z)){
                cube.set(z, new Map());
            }
            const layer = cube.get(z);
            if (!layer.has(y)){
                layer.set(y, new Map());
            }
            const row = layer.get(y);
            row.set(x, true);

            xRangeNew = [Math.min(xRangeNew[0], x), Math.max(xRangeNew[1], x)];
            yRangeNew = [Math.min(yRangeNew[0], y), Math.max(yRangeNew[1], y)];
            zRangeNew = [Math.min(zRangeNew[0], z), Math.max(zRangeNew[1], z)];
            wRangeNew = [Math.min(wRangeNew[0], w), Math.max(wRangeNew[1], w)];
        };

        grid.forEach( (cube, w) => {
            cube.forEach( (layer, z) => {
                layer.forEach( (row, y) => {
                    row.forEach( (val, x) => {
                        active.add([x,y,z,w].join(','));
                    });
                });
            });
        });
        active.forEach(point => {
            const [x, y, z, w] = point.split(',').map(val => parseInt(val));
            let activeNeighbors = 0;
            getNeighbors(x,y,z,w).forEach( ([xNeighbor, yNeighbor, zNeighbor, wNeighbor]) => {
                if (getVal(xNeighbor, yNeighbor, zNeighbor, wNeighbor)){
                    activeNeighbors++;
                }
                else{
                    inactive.add([xNeighbor,yNeighbor,zNeighbor,wNeighbor].join(','));
                }
            });
            if (activeNeighbors === 2 || activeNeighbors === 3){
                setActive(x,y,z,w);
            }
        });

        inactive.forEach(point => {
            const [x, y, z, w] = point.split(',').map(val => parseInt(val));
            let activeNeighbors = 0;
            getNeighbors(x,y,z,w).forEach( ([xNeighbor, yNeighbor, zNeighbor, wNeighbor]) => {
                if (getVal(xNeighbor, yNeighbor, zNeighbor, wNeighbor)){
                    activeNeighbors++;
                }
            });
            if (activeNeighbors === 3){
                setActive(x,y,z,w);
            }
        });

        grid = gridNew;
        xRange = [...xRangeNew];
        yRange = [...yRangeNew];
        zRange = [...zRangeNew];
        wRange = [...wRangeNew];
    };

    const numCycles = 6;
    for (let cycle=1; cycle<=numCycles; cycle++){
        evalGrid();
        // console.log(`\n=== after ${cycle} cycles: =====\n`);
        // showGrid();
    }

    let activeCount = 0;
    grid.forEach( (cube) => {
        cube.forEach( (layer) => {
            layer.forEach( (row) => {
                activeCount += row.size;
            });
        });
    });
    console.log(`after ${numCycles} cycles: ${activeCount} active cubes`);
};

module.exports = { run };
