"use strict";

let canvasArr = [];

const readData = function () {
    destroyCanvas();
    let M = parseInt(document.getElementById("server").value);
    let N = parseInt(document.getElementById("attacks").value);
    let lambda = parseFloat(document.getElementById("lambda").value); // lambda <= N/T
    let T = parseInt(document.getElementById("period").value)
    simulateAttack(M, N, lambda, T);
};

const destroyCanvas = function () {
    for (let c of canvasArr)
        c.destroy();

};

const simulateAttack = function (M, N, lambda, T) {
    let size = T / N;
    let probAttack = parseFloat((size * lambda).toFixed(4)); // probAttack = lambda * (T/N)
    let listOfAttacks = []; // Resulting list of all attacks of M servers 
    let nAttackResult = {}; // Resulting dictionary of all attacks of a single server
    for (let i = 0; i < M; i++) { // For each server 
        for (let j = 0; j <= N; j++) { // For each attack
            let p = Math.random();
            if (j == 0)
                nAttackResult[j] = 0;
            else {
                nAttackResult[j] = nAttackResult[j - 1];
                if (p <= probAttack)
                    nAttackResult[j]++;
            }
        }
        listOfAttacks.push(nAttackResult);
        nAttackResult = {};
    }
    let chart = initializeChar(M, N);
    canvasArr.push(chart);
    let maxNAttack = 0;
    // Get max number of successful attacks 
    for (let d of listOfAttacks)
        maxNAttack = Math.max(d[N - 1], maxNAttack);

    maxNAttack = maxNAttack + 5;
    chart.options.scales.yAxes = [{ ticks: { min: 0, max: maxNAttack } }];
    for (let j = 0; j < M; j++) {
        let xValues = [];
        let yValues = [];
        for (let i = 0; i <= N; i++) {
            xValues.push(parseFloat((size * i).toFixed(2)));
            yValues[i] = listOfAttacks[j][i];
        }
        drawGraph(chart, xValues, yValues);
    }
    //Calculate xData and yData for histogram
    let data = fillData(listOfAttacks, N);
    drawHistogram(data[0], data[1], N, 1, 0);
    let randSubinterval = parseInt(Math.random() * (N - 1));
    data = fillData(listOfAttacks, randSubinterval);
    drawHistogram(data[0], data[1], N, 2,randSubinterval);
}

const fillData = function (listOfAttacks, int) {
    let yData = [];
    let xData = [];
    let dict = {};
    for (let d of listOfAttacks) {
        if (dict[d[int]])
            dict[d[int]]++;
        else
            dict[d[int]] = 1;
    }
    for (const key in dict) {
        xData.push(key);
        yData.push(parseInt(dict[key]));
    }
    return [xData, yData];
};

const drawGraph = function (chart, xValues, yValues) {
    let color = getRandomColor();
    let newDataset = {
        label: 'Successful attacks/Subinterval of T',
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
                        labelString: 'Subinterval of T'
                    }
                }]
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


const drawHistogram = function (xValues, yValues, N, nHistogram, randSubinterval) {
    let color = getRandomColor();
    let histogramData = {
        labels: xValues,
        datasets: [{
            label: "Number of servers/Number of attacks",
            backgroundColor: color,
            borderColor: color,
            borderWidth: 1,
            data: yValues
        }]
    };
    let textTitle;
    if (nHistogram == 1)
        textTitle = "Histogram data at end of period T";
    else
        textTitle = "Histogram data at random subinterval of T ( interval "+ randSubinterval +" of value "+ randSubinterval/N +" )";

    let maxForYValue = 0;
    for (let i = 0; i < yValues.length; i++)
        maxForYValue = Math.max(maxForYValue, yValues[i]);
    maxForYValue += 5;
    let histogram = new Chart(document.getElementById("histogram" + String(nHistogram)).getContext('2d'), {
        type: 'bar',
        data: histogramData,
        options: {
            responsive: true,
            title: {
                display: true,
                text: textTitle,
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Successful attacks'
                    }
                }],
                yAxes: [{
                    ticks: { min: 0, max: maxForYValue },
                    scaleLabel: {
                        display: true,
                        labelString: 'Number of server'
                    }
                }]
            }
        }
    });
    canvasArr.push(histogram);
};