const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    let initialOrder = input[0].split('').map(cup => parseInt(cup));
    let next = new Map();
    let prev = new Map();
    let currentCupId = initialOrder[0];
    initialOrder.forEach( (cupId, i) => {
        const nextIndex = i<initialOrder.length-1 ? i+1 : 0;
        const prevIndex = i>0 ? i-1 : initialOrder.length-1;
        next.set(cupId, initialOrder[nextIndex]);
        prev.set(cupId, initialOrder[prevIndex]);
    });

    const showCups = (final) => {
        let showId = currentCupId;
        let displayString = "";
        do {
            displayString += showId + " ";
            showId = next.get(showId);
        } while (showId !== currentCupId);
        if (final){
            console.log("\ncups: " + displayString.replace(/^./, '').replace(/ /g, ''));
        }
        else{
            console.log("\ncups: " + displayString);
        }
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

    for (let i=0; i<100; i++){
        showCups();
        const inHand = pickup();

        let remainingIds = initialOrder.filter(id => !inHand.includes(id)).sort((a,b) => a-b);
        let destinationId = currentCupId - 1;
        while (!remainingIds.includes(destinationId)){
            destinationId--;
            if (destinationId < remainingIds[0]){
                destinationId = remainingIds[remainingIds.length-1];
            }
        }
        insert(destinationId, inHand);
        currentCupId = next.get(currentCupId);
    }
    currentCupId = 1;
    showCups(true);
    console.log("      45286397 expected");
};

module.exports = { run };
