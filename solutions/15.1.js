const {readLinesNumeric} = require("../common/readInput");

const run = async (params) => {
    const input = await readLinesNumeric({inputPath: params.inputPath});
   
    let spoken = {}; // Big object of 2-element arrays, to track the last 2 times we spoke each number.
    let turn=0;

    const speak = (number, turn) => {
        if (!spoken[number]){
            spoken[number] = [];
        }
        spoken[number].push(turn);
        if (spoken[number].length > 2){
            spoken[number].shift();
        }
    };

    // Starting numbers
    input.forEach(number => {
        speak(number, ++turn);
    });

    let lastSpoken = input[input.length-1];
    while (++turn <= 2020){
        let willSpeak;
        if (spoken[lastSpoken].length === 1){
            willSpeak = 0;
        }
        else{
            willSpeak = spoken[lastSpoken][1] - spoken[lastSpoken][0];
        }
        speak(willSpeak, turn);
        lastSpoken = willSpeak;
    }

    console.log("answer", lastSpoken);
};

module.exports = { run };
