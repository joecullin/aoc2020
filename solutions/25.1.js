const {readLinesNumeric} = require("../common/readInput");

const run = async (params) => {
    const input = await readLinesNumeric({inputPath: params.inputPath});

    const check = (subjectNumber, loopSize) => {
        let key = 1;
        for (let i=1; i<=loopSize; i++){
            key = key * subjectNumber;
            key = key % 20201227;
        }
        return key;
    };

    const findValues = (key1, key2) => {
     // const maxTries = 100000;  // worked for a higher subject number, but it said the answer was too high
        const maxTries = 10000000;

        // for (let subjectNumber=1; subjectNumber<=maxTries; subjectNumber++){
        // Turns out subject number is always 7.

        for (let subjectNumber=7; subjectNumber<=7; subjectNumber++){
            let value1 = 1;
            let value2 = 1;
            let loopSize1 = 0;
            let loopSize2 = 0;
            console.log(`\nTrying subjectNumber ${subjectNumber}`);
            for (let i=1; i<=maxTries; i++){
                if (!loopSize1){
                    value1 = value1 * subjectNumber;
                    value1 = value1 % 20201227;
                    if (value1 === key1){
                        loopSize1 = i;
                    }
                }
                if (!loopSize2){
                    value2 = value2 * subjectNumber;
                    value2 = value2 % 20201227;
                    if (value2 === key2){
                        loopSize2 = i;
                    }
                }
                if (loopSize1 && loopSize2){
                    return {
                        subjectNumber,
                        loopSize1,
                        loopSize2,
                    };
                }
            }
        }
    };

    const found = findValues(input[0], input[1]);
    console.log(found);

    if (found){
        const key = check(input[0], found.loopSize2);
        const key2 = check(input[1], found.loopSize1);
        console.log(" key", key);
        console.log("key2", key2);
    
        console.log(`answer: ${key}`);
    }
};

module.exports = { run };

// 11485508 - too low
// 18906336 - too high
