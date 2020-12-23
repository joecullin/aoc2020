const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    let initialOrder = input[0].split('').map(cup => parseInt(cup));

    // Usually I make parts 1 & 2 totally separate scripts, but I kept
    // wanting to verify that part 1 still worked after making changes.
    let runs = 100;
    let part = 2;
    if (part === 2){
        runs = 10000000;
        const maxInputId = initialOrder.reduce( (previous,current) => { 
            return previous > current ? previous:current;
        });
        let moreItems = 1000000 - initialOrder.length;
        for (let i=0; i<moreItems; i++){
            initialOrder.push(maxInputId + 1 + i);
        }
    }

    let next = new Map();
    let prev = new Map();
    let currentCupId = initialOrder[0];
    initialOrder.forEach( (cupId, i) => {
        const nextIndex = i<initialOrder.length-1 ? i+1 : 0;
        const prevIndex = i>0 ? i-1 : initialOrder.length-1;
        next.set(cupId, initialOrder[nextIndex]);
        prev.set(cupId, initialOrder[prevIndex]);
    });

    const showCups = () => {
        let maxToShow = 20;
        let showId = currentCupId;
        let displayString = "";
        let shown = 0;
        do {
            displayString += showId + " ";
            showId = next.get(showId);
            shown++;
        } while (showId !== currentCupId && shown < maxToShow);
        console.log("cups: " + displayString);
    };

    const pickup = () => {
        let inHand = [];
        for (let i=0; i<3; i++){
            const nextCupId = next.get(currentCupId);
            const nextAfterThat = next.get(nextCupId);
            next.set(currentCupId, nextAfterThat);
            prev.set(nextAfterThat, currentCupId);
            inHand.push(nextCupId);
        }
        return inHand;
    }

    const insert = (destinationCupId, insertIds) => {
        let insertAfterId = destinationCupId;
        insertIds.forEach(insertId => {
            let nextCupId = next.get(insertAfterId);
            next.set(insertId, nextCupId);
            prev.set(insertId, insertAfterId);
            next.set(insertAfterId, insertId);
            prev.set(nextCupId, insertId);
            insertAfterId = insertId;
        });
    }

    let allIds = initialOrder.sort((a,b) => a-b);
    let lowest = allIds[0];
    let highest = allIds[allIds.length-1];

    for (let i=0; i<runs; i++){
        if (part === 1 || [0,1,2].includes(i % 100000)){
            console.log("\n");
            if (part === 2){
                console.log(` round ${i}`);
                console.log(`out of 10000000`);
            }
            showCups();
        }

        const inHand = pickup();

        let destinationId = currentCupId;
        do {
            destinationId--;
            if (destinationId < lowest){
                destinationId = highest;
            }
        } while (inHand.includes(destinationId));

        if (part === 1 || [0,1,2].includes(i % 100000)){
            console.log("inHand: ", inHand);
            console.log("destination: ", destinationId);
        }

        insert(destinationId, inHand);
        currentCupId = next.get(currentCupId);
    }

    currentCupId = 1;
    showCups();
    const nextCup = next.get(1);
    const afterThat = next.get(nextCup);
    console.log(`answer: ${nextCup * afterThat}`);
};

module.exports = { run };
