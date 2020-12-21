const {readLines} = require("../common/readInput");
var intersection = require('array-intersection');

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});
    let foods = [];
    input.forEach(line => {
        const [part1, part2] = line.replace(/[()]/g, '').split(" contains ");
        const ingredients = part1.split(' ');
        const allergens = part2.split(', ');
        foods.push({ingredients, allergens});
    });

    let possible = {};
    foods.forEach(food => {
        food.allergens.forEach(allergen => {
            if (!possible[allergen]){
                possible[allergen] = [];
            }
            possible[allergen].push(food.ingredients);
        });
    });

    let definite = {};
    for (;;){
        const allAllergens = Object.keys(possible);
        for (let i=0; i<allAllergens.length; i++){
            const allergen = allAllergens[i];
            const ingredients = possible[allergen];
            const common = intersection(...ingredients);
            if (common.length === 1){
                const ingredient = common[0];
                definite[allergen] = ingredient;
                delete possible[allergen];
                Object.entries(possible).forEach( ([otherAllergen, ingredientsLists]) => {
                    possible[otherAllergen] = ingredientsLists.map(list => list.filter(otherIngredient => otherIngredient !== ingredient));
                });
            }
        }
        if (allAllergens.length === 0){
            break;
        }
    }
    console.log("definite", definite);

    const unsafeIngredients = Object.values(definite);
    let safeCount = 0;
    foods.forEach(food => {
        food.ingredients.forEach(ingredient => {
            if (!unsafeIngredients.includes(ingredient)){
                safeCount++;
            }
        });
    });
    console.log(`answer: ${safeCount}`);

};

module.exports = { run };
