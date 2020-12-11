
const {readLines} = require("../common/readInput");


const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});
    let containedBy = {};
    input.forEach(line => {
        if (/contain \d/.test(line)){
            // shiny chartreuse bags contain 3 bright brown bags, 2 dim cyan bags, 4 shiny brown bags, 1 clear black bag.
            const parts = line.replace(/ bags?/g, '').replace(/, /g, ',').split(' contain ');
            const contain = parts[1].replace(/\d+\s+/g, '').split(/[,.]/).filter(part => part !== "");
            contain.forEach(bagType => {
                if (!containedBy[bagType]){
                    containedBy[bagType] = [];
                }
                containedBy[bagType].push(parts[0]);
            });
        }
    });

    const getContainers = (startingType) => {
        let containers = containedBy[startingType];
        if (!containers){
            return [];
        }
        containers.forEach(containerType => {
            const nextLevel = getContainers(containerType);
            if (nextLevel && nextLevel.length){
                Array.prototype.push.apply(containers, nextLevel);
            }
        });
        return containers; 
    };

    const answer = (new Set(getContainers("shiny gold"))).size;
    console.log("Answer: " + answer);
};

module.exports = { run };
