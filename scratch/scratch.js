#!/usr/bin/env node

// scratch for day 20
// walk through permutations one digit at a time, bailing out if we're confirmed on a bad path.


let alphabet = [0,1,2,3,4,5,6,7];

const isGoodSequence = (sequence) => {
    console.log(sequence);

    const fakeGood = [7,3,0, 1,6,5, 0,1,3];
    for (let i=0; i<sequence.length; i++){
        if (sequence[i] !== fakeGood[i]){
            return false;
        }
    }
    return true;
};

const findGoodSequences = (alphabet, sequence, targetLength) => {
    if (isGoodSequence(sequence)){
        if (targetLength === sequence.length){
            return sequence;
        }

        for (let i=0; i<alphabet.length; i++){
            let tryNext = findGoodSequences(alphabet, [...sequence, alphabet[i]], targetLength);
            if (tryNext.length){
                return tryNext;
            }
        }
    }
    return [];
};

const good = findGoodSequences(alphabet, [], 9);

console.log("found:\n" + JSON.stringify(good, null, 0));

console.log("done");
