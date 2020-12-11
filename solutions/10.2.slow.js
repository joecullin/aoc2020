const {readLinesNumeric} = require("../common/readInput");

const run = async (params) => {
    const input = await readLinesNumeric({inputPath: params.inputPath});
    const sorted = input.sort((a,b) => a-b);
    const targetJoltage = sorted[sorted.length-1] - 2;
    console.log("target", targetJoltage);

    let goodCount = 0;
    const check = (sequence, depth, start) => {
        // console.log(`${compareCount} start=${start} - checking ` + sequence.join(' '));
        let isGood = true;
        if (sequence[0] > 3 || sequence[sequence.length-1] <= targetJoltage){
            isGood = false;
        }
        if (isGood){
            // for (let i=start-1; i<sequence.length; i++){
            for (let i=start-1; i<sequence.length; i++){
                const difference = sequence[i] - sequence[i-1];
                if (difference > 3 || difference < 1){
                    isGood = false;
                    break;
                }
            }
        }

        let binaryString = sorted.map( master => sequence.includes(master) ? '1' : '0').join('');
        console.log(`${binaryString} ${start}-${sequence.length} (d=${depth}) ` + (isGood?'x':''));

        if (isGood){
            goodCount++;
            if (goodCount && goodCount % 1000000 === 0){
                console.log(goodCount);
            }

            for (let i=start; i<sequence.length; i++){
                const difference = sequence[i] - sequence[i-1];
                if (difference < 3){
                    let newSequence = [...sequence];
                    newSequence.splice(i-1, 1);
                    check(newSequence, depth+1, i);
                }
            }
        }
    }; 

    check(sorted, 0, 0);
    console.log(`goodCount: ${goodCount}`);
};

module.exports = { run };
