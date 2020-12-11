
const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});
    let mustContain = {};
    input.forEach(line => {
        if (/contain \d/.test(line)){
            // shiny chartreuse bags contain 3 bright brown bags, 2 dim cyan bags, 4 shiny brown bags, 1 clear black bag.
            const parts = line.replace(/ bags?/g, '').replace(/, /g, ',').split(' contain ');
            const contain = parts[1].split(/[,.]/).filter(part => part !== "");
            let contents = {};
            contain.forEach(bagSpec => {
                const [, number, type] = bagSpec.match(/^(\d+) (.*)/);
                contents[type] = parseInt(number);
            });
            mustContain[parts[0]] = contents;
        }
    });

    const getContents = (startingType) => {
        let count = 0;
        let containers = mustContain[startingType];
        if (!containers){
            return count;
        }
        Object.entries(containers).forEach( ([containerType, quantity]) => {
            count += quantity;
            const nextLevel = getContents(containerType);
            count += (quantity * nextLevel);
        });
        return count; 
    };

    const answer = getContents("shiny gold");
    console.log("Answer: " + answer);
};

module.exports = { run };
