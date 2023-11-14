"use strict";

let canvasArr = [];

const readData = function () {
    destroyCanvas();
    const M = parseInt(document.getElementById("server").value);
    const N = parseInt(document.getElementById("attacks").value);
    const P = parseInt(document.getElementById("unsec-score").value);
    const S = parseInt(document.getElementById("sec-score").value);
    const prob = parseFloat(document.getElementById("prob").value);
    simulateAttacks(M, N, P, S, prob);
};

const destroyCanvas = function () {
    for (let c of canvasArr)
        c.destroy();
};

const simulateAttacks = function (M, N, P, S, prob) {
    let numberOfAttacks = [];
    let attacks = [];
    let secScore = 0;
    let chart = initializeChar(M, N);
    let systemDiscarded = [];
    let secure = false;
    let histogramData = {};

    for (let i = 0; i < M; i++)
        systemDiscarded[i] = 0;

    for (let i = 0; i < M; i++) {
        numberOfAttacks = [];
        attacks = [];
        secScore = 0;
        secure = false;
        attacks.push(0);
        for (let j = 0; j < N; j++) {

            if (Math.random() <= prob)
                secScore -= 1;
            else
                secScore += 1;

            attacks.push(secScore);
            numberOfAttacks.push(j);

            if (secScore == P && !secure)
                systemDiscarded[i] = 1;
            else if (secScore == S)
                secure = true; 

        }
        if (histogramData [secScore])
            histogramData [secScore]++;
        else
            histogramData [secScore]= 1;
        
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
    console.log(histogramData);
    drawHistogram(Object.keys(histogramData), Object.values(histogramData));
    let precP = document.querySelectorAll("p");
    if (precP.length > 0) {
        precP[0].remove();
    }
    let systemInsecure = 0;
    for (let i = 0; i < systemDiscarded.length; i++) {
        if (systemDiscarded[i] == 1)
            systemInsecure++;
    }
    let result = document.getElementById("container-flex");
    const p = document.createElement("p");
    p.appendChild(document.createTextNode("The probabilities of a system being discarded is " + parseFloat(((systemInsecure / M) * 100).toFixed(2)) + "%"));
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
    canvasArr.push(chart);
    return chart;
};

const drawHistogram = function (xValues, yValues) {
    let color = getRandomColor();
    let histogramData = {
        labels: xValues,
        datasets: [{
            label: "Scores/Number of system",
            backgroundColor: color,
            borderColor: color,
            borderWidth: 1,
            data: yValues
        }]
    };
    let histogram = new Chart(document.getElementById("histogram").getContext('2d'), {
        type: 'horizontalBar',
        data: histogramData,
        options: {
            responsive: true,
            title: {
                display: true,
                text: "Number of system ",
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    ticks: { min: 0 },
                    scaleLabel: {
                        display: true,
                        labelString: 'Number of server'
                    }
                }],
                yAxes: [{
                    ticks: { min: 0 },
                    scaleLabel: {
                        display: true,
                        labelString: 'Scores'
                    }
                }]
            }
        }
    });
    canvasArr.push(histogram);
};
