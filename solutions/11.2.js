const {readLines} = require("../common/readInput");


const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});
    let grid = input.map(line => line.split(''));
    let width = grid[0].length;
    let height = grid.length;

    const checksum = () => {
        let check = '';
        grid.forEach( row => {
            check += row.join('');
        });
        return check;
    };

    let directions = [];
    for (let i=-1; i<=1; i++){
        for (let j=-1; j<=1; j++){
            if (i !== 0 || j !== 0){
                directions.push([i,j]);
            }
        }
    }

    const lookAround = (row, col) => {
        let neighbors = [];
        directions.forEach( ([rowDirection, colDirection]) => {
            let val;
            let checkRow = row;
            let checkCol = col;
            for (;;){
                checkRow += rowDirection;
                checkCol += colDirection;
                if (checkRow > -1 && checkRow < height && checkCol > -1 && checkCol < width){
                    val = grid[checkRow][checkCol];
                }
                else{
                    break;
                }
                if (val === "#" || val === "L"){
                    break;
                }
            }
            if (val){
                neighbors.push(val);
            }
        });
        return neighbors;
    };

    let check;
    let checkPrev = checksum();
    while (checkPrev !== check){
        let changes = [];
        for (let row=0; row<height; row++){
            for (let col=0; col<width; col++){
                let current = grid[row][col];
                if (current === "."){
                    continue;
                }
                const neighbors = lookAround(row, col);
                const occupiedNeighbors = neighbors.filter(val => val === "#").length;

                if (current === "L" && !occupiedNeighbors){
                    changes.push([row, col, "#"]);
                }
                else if (current === "#" && occupiedNeighbors >= 5){
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

    let answer = 0;
    grid.forEach(row => {
        answer += row.filter(val => val === "#").length;
    });
    console.log("Answer: " + answer);
};

module.exports = { run };
