const {readLines} = require("../common/readInput");

const run = async (params) => {
    const input = await readLines({inputPath: params.inputPath});

    let shipPosition = [0,0];
    let waypointPosition = [1,10];

    console.log(`Now at ${shipPosition[0]} x ${shipPosition[1]}`);
    console.log(`Waypoint at ${waypointPosition[0]} x ${waypointPosition[1]}`);

    input.forEach(instruction => {
        console.log(`========================================================= ${instruction}`);
        let action = instruction[0];
        const actionValue = parseInt(instruction.replace(/./, ''));

        if (action === "F"){
            const yChange = waypointPosition[0] - shipPosition[0];
            const xChange = waypointPosition[1] - shipPosition[1];
            for (let i=0; i<actionValue; i++){
                shipPosition[0] += yChange;
                shipPosition[1] += xChange;
                waypointPosition[0] += yChange;
                waypointPosition[1] += xChange;
            }
        }

        if (action === "L" || action === "R"){
            const yDistance = waypointPosition[0] - shipPosition[0];
            const xDistance = waypointPosition[1] - shipPosition[1];
            let yNew = 0;
            let xNew = 0;
            if (instruction === "R90" || instruction === "L270"){
                yNew = -1 * xDistance;
                xNew = yDistance;
            }
            else if (instruction === "R270" || instruction === "L90"){
                yNew = xDistance;
                xNew = -1 * yDistance;
            }
            else if (actionValue === 180){
                yNew = -1 * yDistance;
                xNew = -1 * xDistance;
            }
            waypointPosition[0] = shipPosition[0] + yNew;
            waypointPosition[1] = shipPosition[1] + xNew;
            console.log(`${instruction}: moved waypoint to ${yNew} x ${xNew} from ship.`);
        }
        else if (action === "N"){
            waypointPosition[0] += actionValue;
        }
        else if (action === "S"){
            waypointPosition[0] -= actionValue;
        }
        else if (action === "E"){
            waypointPosition[1] += actionValue;
        }
        else if (action === "W"){
            waypointPosition[1] -= actionValue;
        }
        console.log(`Now at ${shipPosition[0]} x ${shipPosition[1]}`);
        console.log(`Waypoint at ${waypointPosition[0]} x ${waypointPosition[1]}`);
    });

    const answer = Math.abs(shipPosition[0]) + Math.abs(shipPosition[1]);
    console.log("Answer: " + answer);
};

module.exports = { run };
