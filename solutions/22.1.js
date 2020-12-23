const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    let hands = [ [], [] ];
    let currentPlayer = 0;
    input.forEach(line => {
        if (line === "Player 2:"){
            currentPlayer = 1;
        }
        if (/^\d/.test(line)){
            hands[currentPlayer].push(parseInt(line));
        }
    });

    while (hands[0].length && hands[1].length){
        const winner = hands[0][0] > hands[1][0] ? 0 : 1;
        hands[winner].push(...[hands[0].shift(), hands[1].shift()].sort((a,b) => b-a));
    }

    let answer = 0;
    hands.forEach(hand => {
        hand.reverse().forEach( (card, i) => {
            answer += card * (i+1);
        });
    });
    
    console.log(`answer: ${answer}`);

};

module.exports = { run };
