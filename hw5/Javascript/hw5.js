"use strict";

let M = 100; // M server
let T = 1; // T time 1 year
let N = 40; // N subinterval
let size = T / N; // size of each subinterval

const simulateAttack = function () {
    let lambda = parseFloat((Math.random() * (N / T)).toFixed(4)); // lambda <= N/T
    let probAttack = parseFloat((size * lambda).toFixed(4)); // probAttack = lambda * (T/N)
    let listOfAttacks = []; // Resulting list of all attacks of M servers 
    let nAttackResult = {}; // Resulting dictionary of all attacks of a single server
    for (let i = 0; i < M; i++) { // For each server 
        for (let j = 0; j < N; j++) { // For each attack
            let p = Math.random();
            if (j == 0)
                nAttackResult[j] = 0;
            else
                nAttackResult[j] = nAttackResult[j - 1];
            if (p <= probAttack)
                nAttackResult[j]++;
        }
        listOfAttacks.push(nAttackResult);
        nAttackResult = {};
    }
    let chart = initializeChar();
    console.log(listOfAttacks);
    for (let j = 0; j < M; j++) {
        let xValues = [];
        let yValues = [];
        for (let i = 0; i < N; i++) {
            xValues.push(i);
            yValues[i] = listOfAttacks[j][i];
        }
        drawGraph(chart, xValues, yValues);
    }
}

const drawGraph = function (chart, xValues, yValues) {
    let color = getRandomColor();
    let newDataset = {
        label: 'Attack/Number',
        fill: false,
        lineTension: 0,
        backgroundColor: color,
        borderColor: color,
        data: yValues
    };

    chart.data.datasets.push(newDataset);
    chart.data.labels = xValues;
    chart.update();
}

const initializeChar = function () {
    let chart = new Chart(document.getElementById('chart').getContext('2d'), {
        type: 'line',
        data: {
            labels: [],
            datasets: []
        },
        options: {
            title: { 
                display: true,
                text: 'Server M = ' + M + ' number of attacks N = ' + N ,
            },
            legend: {
                display: false
            },
            scales: {
                yAxes: [{ ticks: { min: 0, max: N } }],
                yAxes: [{ ticks: { min: 0, max: N } }]
            }
        }
    });
    return chart;
};


const getRandomColor = function () {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

simulateAttack();