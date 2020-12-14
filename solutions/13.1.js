const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    const myArrival = parseInt(input[0]);
    const busIds = input[1].split(',').filter(id => id !== "x").map(id => parseInt(id));

    const nextDepartures = busIds.map(busId => {
        const time = Math.ceil(myArrival/busId) * busId;
        return {
            busId,
            time,
        };
    })
    .sort( (a,b) => a.time-b.time);

    const answer = nextDepartures[0].busId * (nextDepartures[0].time - myArrival);
    console.log("Answer: " + answer);
};

module.exports = { run };
