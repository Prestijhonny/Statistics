"use strict";

const readData = function () {
    const M = parseInt(document.getElementById("server").value);
    const N = parseInt(document.getElementById("attacks").value);
    const P = parseInt(document.getElementById("unsec-score").value);
    const S = parseInt(document.getElementById("sec-score").value);
    const prob = parseFloat(document.getElementById("prob").value);
    simulateAttacks(M, N, P, S, prob);
};

const simulateAttacks = function (M, N, P, S, prob) {
    let numberOfAttacks = [];
    let attacks = [];
    let secScore = 0;
    let chart = initializeChar(M, N);
    let systemDiscarded = [];
    let secure = false;

    for (let i = 0; i < M; i++)
        systemDiscarded[i] = 0;

    for (let i = 0; i < M; i++) {
        numberOfAttacks = [];
        attacks = [];
        secScore = 0;
        secure = false;
        for (let j = 0; j < N; j++) {

            if (Math.random() <= prob)
                secScore -= 1;
            else
                secScore += 1;

            if (secScore == P && !secure)
                systemDiscarded[i] = 1;
            else if (secure == S) {
                secure = true;
            }

            attacks.push(secScore);
            numberOfAttacks.push(j);
        }
        attacks.unshift(0);
        numberOfAttacks.push(numberOfAttacks.length);
        drawGraph(chart, numberOfAttacks, attacks);
    }
    let ysLine = [];
    let ypLine = [];
    for (let i = 0; i < N + 1; i++) {
        ypLine[i] = P;
        ysLine[i] = S;
    }
    drawGraph(chart, numberOfAttacks, ysLine);
    drawGraph(chart, numberOfAttacks, ypLine);

    let precP = document.querySelectorAll("#canvas-cont p");
    if (precP.length > 0) {
        precP[0].remove();
    }

    let result = document.getElementById("canvas-cont");
    const p = document.createElement("p");
    p.appendChild(document.createTextNode("Number of secure systems are "+ Math.random() +" and the probabilities of a system being discarded is " + + "%"));
    result.appendChild(p);
};

const getRandomColor = function () {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};


const drawGraph = function (chart, xValues, yValues) {
    const color = getRandomColor();
    let newDataset = {
        label: 'Score/Number of attacks',
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

const initializeChar = function (M, N) {
    let chart = new Chart(document.getElementById('chart').getContext('2d'), {
        type: 'line',
        data: {
            labels: [],
            datasets: []
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Server M = ' + M + ' number of attacks N = ' + N,
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Number of attacks'
                    }
                }]
            }
        }
    });

    return chart;
};
