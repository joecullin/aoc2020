const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    let rules = [];
    let myTicket;
    let otherTickets = [];

    // Parse input

    const fieldRegex = /^([a-z ]+): (\d+)-(\d+) or (\d+)-(\d+)$/;
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
                    possiblePositions: [],
                    position: -1,
                    oneLow: parseInt(parsed[2]),
                    oneHigh: parseInt(parsed[3]),
                    twoLow: parseInt(parsed[4]),
                    twoHigh: parseInt(parsed[5]),
                });
            }
        }
        lineNum++;
    }

    const isMatch = (fieldValue, rule) => {
        return (
            (fieldValue >= rule.oneLow && fieldValue <= rule.oneHigh)
            ||
            (fieldValue >= rule.twoLow && fieldValue <= rule.twoHigh)
        );
    };

    // Find valid tickets

    let validNearbyTickets = otherTickets.filter(ticket => {
        let isValid = true;
        ticket.forEach(fieldValue => {
            const ruleMatches = rules.filter(rule => isMatch(fieldValue, rule));
            if (!ruleMatches.length){
                isValid = false;
            }
        });
        if (isValid){
            return ticket;
        }
    });

    // Figure out field positions

    rules.forEach(rule => {
        for (let i=0; i<rules.length; i++){
            const matches = validNearbyTickets.map(ticket => ticket[i]).filter(fieldValue => isMatch(fieldValue, rule));
            if (matches.length === validNearbyTickets.length){
                rule.possiblePositions.push(i);
            }
        }
    });

    let takenPositions = [];
    rules.sort((a,b) => a.possiblePositions.length - b.possiblePositions.length).forEach(rule => {
        rule.position = rule.possiblePositions.find(position => !takenPositions.includes(position));
        takenPositions.push(rule.position);
    });

    // Find my answer

    const departureFieldPositions = rules.filter(rule => /^departure/.test(rule.field)).map(rule => rule.position);
    const departureValues = myTicket.filter( (fieldValue, i) => departureFieldPositions.includes(i) );
    const answer = departureValues.reduce( (acc, cur) => acc * cur, 1);
    console.log("Answer: " + answer);
};

module.exports = { run };
