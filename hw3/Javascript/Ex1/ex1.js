"use strict";

function getRandomValue() {
    let max = 1, min = -1;
    return Math.random() * (max - min) + min;
}

let numChart = 0;

function drawScatterPlot(xyValues, N) {
    const div = document.createElement("div");
    div.setAttribute("id", "container");
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "scatterChart" + numChart);
    document.body.appendChild(div);
    div.appendChild(canvas);
    const scatterChar = new Chart("scatterChart" + numChart, {
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
                yAxes: [{ ticks: { min: -1, max: 1 } }],
            }
        }
    });
    numChart++;
}

function simulationAccumulation(N) {
    let xyValues = [];
    let secScore = 0, nAttack = 0;
    let p = getRandomValue().toFixed(4);
    for (let i = 0; i < N; i++) {
        secScore = getRandomValue();
        if (secScore >= p)
            nAttack++;
        else
            nAttack--;
        xyValues.push({ x: nAttack, y: secScore });
    }
    return xyValues;
}


function cumulatedFrequency(N) {
    let xyValues = [];
    let secScore = 0, nAttack = 0;
    let p = getRandomValue().toFixed(4);
    for (let i = 0; i < N; i++) {
        secScore = getRandomValue();
        if (secScore >= p)
            nAttack++;
        xyValues.push({ x: nAttack / N, y: secScore });
    }
    return xyValues;

}

function normalizedRatio(N) {
    let xyValues = [];
    let secScore = 0, nAttack = 0;
    let p = getRandomValue().toFixed(4);
    for (let i = 0; i < N; i++) {
        secScore = getRandomValue();
        if (secScore >= p)
            nAttack++;
        xyValues.push({ x: nAttack / Math.sqrt(N), y: secScore });
    }
    return xyValues;

}


function cumulatedFrequency(N) {
    let xyValues = [];
    let secScore = 0, nAttack = 0;
    let p = getRandomValue().toFixed(4);
    for (let i = 0; i < N; i++) {
        secScore = getRandomValue();
        if (secScore >= p)
            nAttack++;
        xyValues.push({ x: nAttack, y: secScore });
    }
    return xyValues;

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



let N = 70;
let M = 3;

for (let i = 0; i < M; i++) {
    drawScatterPlot(simulationAccumulation(N), N);
    drawScatterPlot(cumulatedFrequency(N), N);
    drawScatterPlot(normalizedRatio(N), N);
    drawScatterPlot(cumulatedFrequency(N), N);
    sleep(3000);
}
