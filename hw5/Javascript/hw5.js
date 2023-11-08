"use strict";

let canvasArr = [];

const readData = function () {
    destroyCanvas();
    let M = parseInt(document.getElementById("server").value);
    let N = parseInt(document.getElementById("attacks").value);
    let lambda = parseFloat(document.getElementById("lambda").value); // lambda <= N/T
    let T = parseInt(document.getElementById("period").value)
    simulateAttacks(M, N, lambda, T);
};

const destroyCanvas = function () {
    for (let c of canvasArr)
        c.destroy();
};

const simulateAttacks = function (M, N, lambda, T) {
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
        textTitle = "Histogram data at random subinterval of T ( interval "+ randSubinterval +" of value "+ parseFloat((randSubinterval/N).toFixed(2)) +" )";

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
const chart = document.getElementById("chart");
const histogram1 = document.getElementById("histogram1");
const histogram2 = document.getElementById("histogram2");
const canvas1 = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const canvas3 = document.getElementById("canvas3");

// Move canvas 1
chart.addEventListener("mousedown", () => {
    chart.addEventListener("mousemove", update1);
    window.addEventListener("mouseup", () => {
        chart.removeEventListener("mousemove", update1);
    });
  });

  function update1(ev) {
    canvas1.style.setProperty("left", `${ev.x - 200}px`);
    canvas1.style.setProperty("top", `${ev.y - 25}px`);
  }

  // Move canvas 2
  histogram1.addEventListener("mousedown", () => {
    histogram1.addEventListener("mousemove", update2);
    window.addEventListener("mouseup", () => {
        histogram1.removeEventListener("mousemove", update2);
    });
  });

  function update2(ev) {
    canvas2.style.setProperty("left", `${ev.x - 200}px`);
    canvas2.style.setProperty("top", `${ev.y - 25}px`);
  }

  // Move canvas 3
  histogram2.addEventListener("mousedown", () => {
    histogram2.addEventListener("mousemove", update3);
    window.addEventListener("mouseup", () => {
        histogram2.removeEventListener("mousemove", update3);
    });
  });

  function update3(ev) {
    canvas3.style.setProperty("left", `${ev.x - 200}px`);
    canvas3.style.setProperty("top", `${ev.y - 25}px`);
  }