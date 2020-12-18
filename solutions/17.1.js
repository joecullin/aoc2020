const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});
    let grid = new Map();
    let xRange = [0,0];
    let yRange = [0,0];
    let zRange = [0,0];

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
    grid.set(0, inputLayer);

    const getVal = (x,y,z) => {
        let val;
        const layer = grid.get(z);
        if (layer){
            const row = layer.get(y);
            if (row){
                val = row.get(x);
            }
        }
        return val;
    }

    const showGrid = () => {
        for (let z=zRange[0]; z<=zRange[1]; z++){
            console.log(`z=${z}:`);
            const layer = grid.get(z);
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
    };
    console.log("starting grid:");
    showGrid();

    const getNeighbors = (x,y,z) => {
        let neighbors = [];
        for (let xDiff=-1;xDiff<=1;xDiff++){
            for (let yDiff=-1;yDiff<=1;yDiff++){
                for (let zDiff=-1;zDiff<=1;zDiff++){
                    let xNeighbor = x + xDiff;
                    let yNeighbor = y + yDiff;
                    let zNeighbor = z + zDiff;
                    if ( !(xNeighbor === x && yNeighbor === y && zNeighbor === z) ){
                        neighbors.push([xNeighbor,yNeighbor,zNeighbor]);
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

        const setActive = (x,y,z) => {
            if (!gridNew.has(z)){
                gridNew.set(z, new Map());
            }
            const layer = gridNew.get(z);
            if (!layer.has(y)){
                layer.set(y, new Map());
            }
            const row = layer.get(y);
            row.set(x, true);

            xRangeNew = [Math.min(xRangeNew[0], x), Math.max(xRangeNew[1], x)];
            yRangeNew = [Math.min(yRangeNew[0], y), Math.max(yRangeNew[1], y)];
            zRangeNew = [Math.min(zRangeNew[0], z), Math.max(zRangeNew[1], z)];
        };

        grid.forEach( (layer, z) => {
            layer.forEach( (row, y) => {
                row.forEach( (val, x) => {
                    active.add([x,y,z].join(','));
                });
            });
        });
        active.forEach(point => {
            const [x, y, z] = point.split(',').map(val => parseInt(val));
            let activeNeighbors = 0;
            getNeighbors(x,y,z).forEach( ([xNeighbor, yNeighbor, zNeighbor]) => {
                if (getVal(xNeighbor, yNeighbor, zNeighbor)){
                    activeNeighbors++;
                }
                else{
                    inactive.add([xNeighbor,yNeighbor,zNeighbor].join(','));
                }
            });
            if (activeNeighbors === 2 || activeNeighbors === 3){
                setActive(x,y,z);
            }
        });

        inactive.forEach(point => {
            const [x, y, z] = point.split(',').map(val => parseInt(val));
            let activeNeighbors = 0;
            getNeighbors(x,y,z).forEach( ([xNeighbor, yNeighbor, zNeighbor]) => {
                if (getVal(xNeighbor, yNeighbor, zNeighbor)){
                    activeNeighbors++;
                }
            });
            if (activeNeighbors === 3){
                setActive(x,y,z);
            }
        });

        grid = gridNew;
        xRange = [...xRangeNew];
        yRange = [...yRangeNew];
        zRange = [...zRangeNew];
    };

    const numCycles = 6;
    for (let cycle=1; cycle<=numCycles; cycle++){
        evalGrid();
        // console.log(`\n=== after ${cycle} cycles: =====\n`);
        // showGrid();
    }

    let activeCount = 0;
    grid.forEach( (layer) => {
        layer.forEach( (row) => {
            activeCount += row.size;
        });
    });
    console.log(`after ${numCycles} cycles: ${activeCount} active cubes`);
};

module.exports = { run };
