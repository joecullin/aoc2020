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

    // It turns out this doesn't make much difference.
    // When I had some flaws in my logic, it helped me get the wrong answer faster :)
    let winners = new Map();

    const game = ([...hand0], [...hand1], depth) => {
        let history = new Set();
        while (hand0.length && hand1.length){
            const handSummary = hand0.join(',') + '|' + hand1.join(',');
            if (history.has(handSummary)){
                return 0;
            }
            else if (depth > 1 && winners.has(handSummary)){
                const winner = winners.get(handSummary);
                return winner;
            }
            history.add(handSummary);

            let card0 = hand0.shift();
            let card1 = hand1.shift();

            let winner;
            let pushCards;
            if (hand0.length >= card0 && hand1.length >= card1){
                const newHand0 = hand0.slice(0,card0);
                const newHand1 = hand1.slice(0,card1);
                winner = game(newHand0, newHand1, depth+1);
                const newHandSummary = newHand0.join(',') + '|' + newHand1.join(',');
                winners.set(newHandSummary, winner);
            }
            else{
                winner = card1 > card0 ? 1 : 0;
            }
            pushCards = winner === 1 ? [card1, card0] : [card0, card1];
            if (winner === 1){
                hand1.push(...pushCards);
            }
            else{
                hand0.push(...pushCards);
            }
        }
        if (depth > 0){
            return hand0.length ? 0 : 1;
        }
        else{
            return [ [...hand0], [...hand1] ];
        }
    };

    let winningHands = game(hands[0], hands[1], 0);
    console.log("winningHands", winningHands);
    let answer = 0;
    winningHands.forEach(hand => {
        hand.reverse().forEach( (card, i) => {
            answer += card * (i+1);
        });
    });
    
    console.log(`answer: ${answer}`);

};

module.exports = { run };
