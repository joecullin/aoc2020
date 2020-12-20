const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});
    const messages = input.filter(line => /^[ab]/.test(line));

    const checkRule = (rule) => {
        return /\d/.test(rule.regexPattern) ? "incomplete" : "complete";
    }

    const translateOrs = (rule) => {
        if (/[|]/.test(rule)){
            const parts = rule.split("|");
            const newRule = parts.map(part => `(?:${part})`).join(" | ");
            return newRule;
        }
        else{
            return rule;
        }
    }

    let rules = input.filter(line => /^\d/.test(line)).map(line => {
        let [ruleNum, ruleString] = line.split(":");
        if (ruleNum === "8"){
            ruleString = " 42 | 42 8";
        }
        else if (ruleNum === "11"){
            ruleString = " 42 31 | 42 11 31";
        }

        ruleString = ruleString.trim().replace(/"/g, "");
        let rule = {
            id: ruleNum,
            rule: ruleString,
            regexPattern: /\d/.test(ruleString) ? translateOrs(ruleString) : ruleString,
        };
        rule.regexPattern = `(?:${rule.regexPattern})`;
        rule.state = checkRule(rule);
        return rule;
    });

    // Expand rules until all are complete.
    for (;;){
        const completeRules = rules.filter(rule => rule.state === "complete");
        if (!completeRules.length){
            break;
        }

        // Take one complete rule, and apply it to all incomplete rules.
        const completeRule = completeRules[0];
        rules.filter(rule => rule.state === "incomplete").forEach( rule => {
            const lookFor = new RegExp(`\\b${completeRule.id}\\b`);
            if (lookFor.test(rule.rule)){
                const replacePattern = new RegExp(`\\b${completeRule.id}\\b`, "g");
                rule.regexPattern = rule.regexPattern.replace(replacePattern, completeRule.regexPattern);
                rule.state = checkRule(rule);
            }
        });
        completeRule.state = "processed";
    }
    rules.forEach(rule => {
        rule.regexPattern = rule.regexPattern.replace(/ /g, "");
    });

    const rule42 = rules.find(rule => rule.id === "42");
    const rule31 = rules.find(rule => rule.id === "31");

    // rule 8: 1 or more 42's
    // rule 11: one or more 42's followed by the same number of 31's

    let fullRegex = new RegExp([
        '^',
        `(${rule42.regexPattern}+)`,
        `(${rule31.regexPattern}+)`,
        '$',
    ].join(''));

    let good = [];
    messages.filter( message => fullRegex.test(message)).forEach(message => {
        const [,matches42, matches31] = message.match(fullRegex);

        // Because of rule 8, we'll always have at least one more 42 than 31.
        const count42 = [...matches42.matchAll(new RegExp(`${rule42.regexPattern}`, "g"))].length;
        const count31 = [...matches31.matchAll(new RegExp(`${rule31.regexPattern}`, "g"))].length;
        if (count42 > count31){
            good.push(message);
        }
    });

    const answer = good.length; 
    console.log(`answer: ${answer}`);
};

module.exports = { run };
