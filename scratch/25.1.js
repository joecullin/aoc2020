const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    const findLogs = (number) => {
        const maxTries = 10;
        for (let i=1; i<=maxTries; i++){
                const log = Math.log(number) / Math.log(i);
                console.log(`${number} / ${i} ==> ${log}`);
        }
    };

    const findFactorPairs = (number) => {
        const maxFactor = Math.sqrt(number);
        let result = [];
    
        for (let x=1; x<=maxFactor; x++)
        {
            const c = number/x;
            const d = Math.floor(c);
            if (c==d){
                result.push([x,c]);
            }
        }
        return result;
    }

    const findValues = (publicKey) => {
        const maxTries = 10;
        for (let i=1; i<=maxTries; i++){
            let result = i * 20201227;
            console.log(`${publicKey} 20201227 * ${i} = ${result}`);
            let addBackRemainder = result + 20201227;
            console.log("with remainder added back", addBackRemainder);
            const factorPairs = findFactorPairs(addBackRemainder);
            console.log("factor pairs", factorPairs);
            factorPairs.forEach( pair => {
                if (pair[0] > 1 && pair[1] > 1){
                    console.log("\nlooking within ", pair);
                    //findValues(pair[0]);
                    //findValues(pair[1]);
                }
            });
        }
    };

    const check = (subjectNumber, loopSize) => {
        let key = 1;
        for (let i=1; i<=loopSize; i++){
            key = key * subjectNumber;
            key = key % 20201227;
            console.log(`${i} ${key}`);
        }
        return key;
    };

    const found = findValues(parseInt(input[0]));
    console.log(found);

    const key = check(7, 8);
    console.log("key", key);

    const factors = findLogs(5764801);
    console.log(factors);


    // console.log(`answer: ${answer}`);
};

module.exports = { run };
