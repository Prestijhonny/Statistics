"use strict";

//I am supposing that if the bit is 0 then the system is penetrated
// if the bit is 1 then the system is protected
function getRandomValue(p) {
    let randBit = Math.random();
    if (randBit < p)
        return 1; //  return 1 with prob p
    else
        return -1; // return -1 with prob 1-p
}


function simulation(N) {
    let xyValues = [];
    // Generation of N attack
    for (let i = 0; i < N; i++)
        // x stands for number of attacks and y for security score
        xyValues.push({ x: i, y: getRandomValue(0.4) });
    drawScatterPlot(xyValues, N);
}


function drawScatterPlot(xyValues, N) {
    const scatterChar = new Chart("scatterChart", {
        type: "scatter",
        data: {
            datasets: [{
                label: "Score/Attacks number",
                backgroundColor: 'rgb(0,0,255)',
                pointRadius: 6,
                pointBackgroundColor: "rgb(0,0,255)",
                data: xyValues
            }]
        },
        options: {
            legend: { display: true },
            scales: {
                xAxes: [{ ticks: { min: -1, max: N } }],
                yAxes: [{ ticks: { min: -2, max: 2 } }],
            }
        }
    });
}
let N = 30;
simulation(N);