const logger = require("../common/logger-simple");
const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});
    const passports = input.join("\n").split("\n\n")
    .map(record => {
        const fieldData = record.replace(/\s+/g, ' ').split(' ');
        let passport = {};
        fieldData.forEach(f => {
            const [field, value] = f.split(":");
            passport[field] = value;
        });
        passport.validFields = Object.keys(passport).filter(f => f !== "cid").length;
        return passport;
    });

    let validCount = passports.filter(p => p.validFields >= 7).length;
    console.log("Valid count: " + validCount);
};

module.exports = { run };
