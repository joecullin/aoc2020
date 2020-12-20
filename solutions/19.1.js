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
            const newRule = parts.map(part => `(${part})`).join(" | ");
            return newRule;
        }
        else{
            return rule;
        }
    }

    let rules = input.filter(line => /^\d/.test(line)).map(line => {
        let [ruleNum, ruleString] = line.split(":");
        ruleString = ruleString.trim().replace(/"/g, "");
        let rule = {
            id: ruleNum,
            rule: ruleString,
            regexPattern: /\d/.test(ruleString) ? translateOrs(ruleString) : ruleString,
        };
        rule.regexPattern = `(${rule.regexPattern})`;
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

    const ruleZero = rules.find(rule => rule.id === "0");
    const regex = new RegExp(`^${ruleZero.regexPattern}$`);
    const answer = messages.filter( message => regex.test(message) ).length;
    console.log(`answer: ${answer}`);
};

module.exports = { run };
