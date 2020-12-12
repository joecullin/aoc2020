const {readLines} = require("../common/readInput");


const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});
    let grid = input.map(line => line.split(''));
    let width = grid[0].length;
    let height = grid.length;

    const show = () => {
        console.log("--------------------------------------------");
        grid.forEach( (row, i) => {
            console.log(row.join('') + " " + i);
        });
    };
    const checksum = () => {
        let check = '';
        grid.forEach( row => {
            check += row.join('');
        });
        return check;
    };

    let check;
    let checkPrev = checksum();
    while (checkPrev !== check){
        // show(grid);
        let changes = [];
        for (let row=0; row<height; row++){
            for (let col=0; col<width; col++){
                let current = grid[row][col];
                if (current === "."){
                    continue;
                }
                let neighbors = [];
                if (row > 0){
                    let prevRow = grid[row-1];
                    neighbors.push(prevRow[col]);
                    if (col > 0){ neighbors.push(prevRow[col-1]); }
                    if (col+1 < width){ neighbors.push(prevRow[col+1]); }
                }
                // this row:
                if (col > 0){ neighbors.push(grid[row][col-1]); }
                if (col+1 < width){ neighbors.push(grid[row][col+1]); }
                // next row:
                if (row+1 < height){
                    let nextRow = grid[row+1];
                    neighbors.push(nextRow[col]);
                    if (col > 0){ neighbors.push(nextRow[col-1]); }
                    if (col+1 < width){ neighbors.push(nextRow[col+1]); }
                }
                const occupiedNeighbors = neighbors.filter(val => val === "#").length;

                if (current === "L" && !occupiedNeighbors){
                    changes.push([row, col, "#"]);
                }
                else if (current === "#" && occupiedNeighbors >= 4){
                    changes.push([row, col, "L"]);
                }
            }
        }
        changes.forEach( ([row, col, val]) => {
            grid[row][col] = val;
        });

        checkPrev = check;
        check = checksum();
    }
    show(grid);

    let answer = 0;
    grid.forEach(row => {
        answer += row.filter(val => val === "#").length;
    });
    console.log("Answer: " + answer);
};

module.exports = { run };
