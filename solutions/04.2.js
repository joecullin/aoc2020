
const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});
    const passports = input.join("\n").split("\n\n")
    .map(record => {
        const fieldData = record.replace(/\s+/g, ' ').split(' ');
        let passport = {
            valid: true,
        };
        fieldData.forEach(f => {
            const [field, value] = f.split(":");
            passport[field] = value;
        });
        passport.fieldCount = Object.keys(passport).filter(f => f !== "cid").length;
        if (passport.fieldCount < 8){
            passport.valid = false;
        }
        else{
            let validFields = [];

            // byr
            const byrParts = passport.byr.match(/^(\d{4})$/);
            if (byrParts.length){
                const value = parseInt(byrParts[1]);
                if (value >= 1920 && value <= 2002){
                    validFields.push('byr');
                }
            }

            // iyr
            const iyrParts = passport.iyr.match(/^(\d{4})$/);
            if (iyrParts.length){
                const value = parseInt(iyrParts[1]);
                if (value >= 2010 && value <= 2020){
                    validFields.push('iyr');
                }
            }

            // eyr
            const eyrParts = passport.eyr.match(/^(\d{4})$/);
            if (eyrParts.length){
                const value = parseInt(eyrParts[1]);
                if (value >= 2020 && value <= 2030){
                    validFields.push('eyr');
                }
            }

            // hgt
            const hgtValues = passport.hgt.match(/^(\d+)([cmin]{2})$/);
            if (hgtValues && hgtValues.length){
                const value = parseInt(hgtValues[1]);
                if (hgtValues[2] == "cm" && value >= 150 && value <= 193){
                    validFields.push('hgt');
                }
                else if (hgtValues[2] == "in" && value >= 59 && value <= 76){
                    validFields.push('hgt');
                }
            }

            // hcl
            if (/^#[a-f0-9]{6}$/.test(passport.hcl)){
                validFields.push('hcl');
            }

            // ecl
            if ([ "amb", "blu", "brn", "gry", "grn", "hzl", "oth" ].includes(passport.ecl)){
                validFields.push('ecl');
            }

            // pid
            if (/^\d{9}$/.test(passport.pid)){
                validFields.push('pid');
            }

            passport.validFields = validFields;
            passport.valid = validFields.length >= 7;
        }

        return passport;
    });

    let validCount = passports.filter(p => p.valid).length;
    console.log("Valid count: " + validCount);
};

module.exports = { run };
