const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    let buses = input[1].split(',')
    .map( (id, offset) => {
        return {
            id: parseInt(id),
            offset,
        };
    })
    .filter(bus => bus.id)
    .sort((a,b) => b.id-a.id);  // sort from longest route to shortest

    // compute distance from each bus to the longest
    buses.forEach( (bus, i) => {             
        bus.gap = buses[0].offset - buses[i].offset;
    });
    console.log(buses);

    const longest = buses[0];
    const step = longest.id;

    let time = 0;
    console.log(`step: ${step}`);
    for (;;){
        if (time % 100000000 === 0){
            console.log(time);
            console.log("100000000000000 <--- answer is bigger than this");
        }

        let hey = true;
        for (let i=1; i<buses.length; i++){
            if (( (time-buses[i].gap) / buses[i].id) % 1 !== 0){
                hey = false;
                break;
            }
        }
        if (hey){
            console.log(time - longest.offset);
            console.log("****** !!!!!!!!! ********");
            break;
        }

        time += step;
    }
};

module.exports = { run };
