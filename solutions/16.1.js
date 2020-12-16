const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    let rules = [];
    let myTicket;
    let otherTickets = [];

    // Parse input

    const fieldRegex = /^([a-z]+): (\d+)-(\d+) or (\d+)-(\d+)$/;
    const ticketRegex = /^[0-9,]+$/;
    let lineNum = 0;
    while (lineNum < input.length){
        const line = input[lineNum];
        if (myTicket){
            const parsed = line.match(ticketRegex);
            if (parsed){
                otherTickets.push(parsed[0].split(",").map(val => parseInt(val)));
            }
        }
        else if (line === "your ticket:"){
            lineNum++;
            const parsed = input[lineNum].match(ticketRegex);
            if (parsed){
                myTicket = parsed[0].split(",").map(val => parseInt(val));
            }
        }
        else {
            const parsed = line.match(fieldRegex);
            if (parsed){
                rules.push({
                    field: parsed[1],
                    oneLow: parseInt(parsed[2]),
                    oneHigh: parseInt(parsed[3]),
                    twoLow: parseInt(parsed[4]),
                    twoHigh: parseInt(parsed[5]),
                });
            }
        }
        lineNum++;
    }

    // Check tickets

    let allInvalidValues = [];
    otherTickets.forEach(ticket => {
        ticket.forEach(fieldValue => {
            const ruleMatches = rules.filter(rule =>
                (fieldValue >= rule.oneLow && fieldValue <= rule.oneHigh)
                ||
                (fieldValue >= rule.twoLow && fieldValue <= rule.twoHigh)
            );
            if (!ruleMatches.length){
                allInvalidValues.push(fieldValue);
            }
        });
    });

    const answer = allInvalidValues.reduce( (acc, cur) => acc + cur, 0);
    console.log("Answer: " + answer);
};

module.exports = { run };
