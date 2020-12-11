
const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});
    const answer = input.join("\n").split("\n\n")
    .reduce( (sum, group) => {
        let members = group.split("\n");
        let yesCounts = {};
        members.forEach(person => {
            person.split('').forEach(question => {
                yesCounts[question] = yesCounts[question] ? yesCounts[question]+1 : 1;
            });
        });
        return sum + Object.values(yesCounts).filter(count => count === members.length).length;
    }, 0);
    console.log("Answer: " + answer);
};

module.exports = { run };
