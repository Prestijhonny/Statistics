"use strict";
const chartID = "myCanvas";
const canvas1 = document.getElementById("canvas1");
const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d");
const numberOfLine = 10;
let canvasArr = [];

function destroyCanvas() {
    for (let c of canvasArr) c.destroy();
}

document.getElementById("SDE").addEventListener("change", function () {
    destroyCanvas();
    var selectedAlg = this.value;

    switch (selectedAlg) {
        case "empty":
            console.log("No algorithm selected");
            break;

        case "AB":
            console.log("Arithmetic Brownian selected");
            generateArithmeticBrownianMotion();
            break;

        case "GB":
            console.log("Geometric Brownian selected");
            generateGeometricBrownianMotion();
            break;

        case "OU":
            console.log("Ornstein-Uhlenbeck selected");
            generateOU();
            break;

        case "V":
            console.log("Vasicek selected");
            generateVasicek();
            break;

        case "HW":
            console.log("Hull-White selected");
            generateHullWhite();
            break;

        case "CIR":
            console.log("Cox-Ingersoll-Ross selected");
            generateCoxIngersollRoss();
            break;

        case "BK":
            console.log("Black-Karasinski selected");
            generateBlackKarasinski();
            break;

        case "H":
            console.log("Heston selected");
            generateHeston();
            break;

        case "CM":
            console.log("Chen model selected");
            generateChen();
            break;
    }
});

// Move canvas 1
myCanvas.addEventListener("mousedown", () => {
    myCanvas.addEventListener("mousemove", update1);
    window.addEventListener("mouseup", () => {
        myCanvas.removeEventListener("mousemove", update1);
    });
});

function update1(ev) {
    canvas1.style.setProperty("left", `${ev.x - 200}px`);
    canvas1.style.setProperty("top", `${ev.y - 25}px`);
}

function getRandomRGBAColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = Math.random();
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

//   --------------------
// Function to generate Arithmetic Brownian Motion data
function generateArithmeticBrownianMotion() {
    let numSteps = 100;

    const xValues = Array.from({ length: numSteps }, (_, i) => i);
    let labelGraph = "Arithmetic Brownian Motion";
    initializeGraph(labelGraph);

    for (let j = 0; j < numberOfLine; j++) {

        let mu = Math.random() * (0.3 - 0.1) + 0.1, sigma = Math.random() * (0.4 - 0.1) + 0.1, X0 = 0, dt = 0.01;
        const yValues = [X0];

        for (let i = 0; i < numSteps; i++) {
            const dW = Math.sqrt(dt) * normalDistribution();
            const newValue = (mu * dt + sigma * dW);
            yValues.push(yValues[i] + newValue);
        }
        addLine(xValues, yValues);
    }

}

//   --------------------
// Function to generate Geometric Brownian Motion data
function generateGeometricBrownianMotion() {
    const numSteps = 100;
    const xValues = Array.from({ length: numSteps }, (_, i) => i);

    let labelGraph = "Geometric Brownian Motion";
    initializeGraph(labelGraph);
    for (let j = 0; j < numberOfLine; j++) {
        const mu = Math.random() * (1 - 0.1) + 0.1;
        const sigma = Math.random() * (0.3 - 0.1) + 0.1;
        const dt = 0.01;
        const S0 = 1;
        const yValues = [S0];
        for (let i = 0; i < numSteps; i++) {
            const dW = Math.sqrt(dt) * normalDistribution();
            const newValue = mu * yValues[i] * dt + sigma * yValues[i] * dW;
            yValues.push(yValues[i] + newValue);
        }
        addLine(xValues, yValues);
    }


}

//   --------------------
// Function to generate Ornstein-Uhlenbeck
function generateOU() {
    let numSteps = 100;
    const xValues = Array.from({ length: numSteps }, (_, i) => i);
    initializeGraph("Ornstein-Uhlenbeck");

    for (let j = 0; j < numberOfLine; j++) {
        let theta = 1, mu = Math.random() * (10 - 1) + 1, sigma = Math.sqrt(2), X0 = -10, dt = 0.05;
        let yValues = [X0];
        for (let i = 0; i < numSteps; i++) {
            const dW = Math.sqrt(dt) * normalDistribution();
            const k = theta * (mu - yValues[i]) * dt + sigma * dW;
            yValues.push(yValues[i] + k);
        }
        addLine(xValues, yValues);
    }


}

//   --------------------
// Function to generate Vasicek
function generateVasicek() {
    let numSteps = 100;
    const xValues = Array.from({ length: numSteps }, (_, i) => i);
    initializeGraph("Vasicek");

    for (let j = 0; j < numberOfLine; j++) {
        let k = Math.random() * (0.5 - 0.2) + 0.2, theta = Math.random() * (0.6 - 0.2) + 0.2, sigma = Math.random() * (0.4 - 0.1) + 0.1, R0 = 0, dt = 0.01;
        let yValues = [R0];
        for (let i = 0; i < numSteps; i++) {
            const dW = Math.sqrt(dt) * normalDistribution();
            const rt = k * (theta - yValues[i]) * dt + sigma * Math.sqrt(dt) * dW;
            yValues.push(yValues[i] + rt);
        }
        addLine(xValues, yValues);
    }

}

//   --------------------
// Function to generate Hull-White
function generateHullWhite() {
    let numSteps = 100;
    const xValues = Array.from({ length: numSteps }, (_, i) => i);

    initializeGraph("Hull-White");
    for (let j = 0; j < numberOfLine; j++) {
        const theta1 = Math.random() * (0.1 - 0.02) * 0.02, theta2 = Math.random() * (0.1 - 0.01) * 0.01;
        const a = Math.random() * (0.3 - 0.1) * 0.1, sigma = Math.random() * (0.1 - 0.02) * 0.02, R0 = 0.015, dt = 0.01;
        let yValues = [R0];
        for (let i = 0; i < numSteps; i++) {
            const dW = Math.sqrt(dt) * normalDistribution();
            const k = ((theta1 + (theta2 * i)) - (a * yValues[i])) * dt + sigma * dW;
            yValues.push(yValues[i] + k);
        }
        addLine(xValues, yValues);
    }

}

//   --------------------
// Function to generate Cox-Ingersoll-Ross
function generateCoxIngersollRoss() {
    let numSteps = 100;
    const xValues = Array.from({ length: numSteps }, (_, i) => i);
    initializeGraph("Cox-Ingersoll-Ross");

    for (let j = 0; j < numberOfLine; j++) {

        const k = Math.random()*(0.5-0.1)+0.1, theta = Math.random()*(0.5-0.05)+0.05, sigma = Math.random()*(0.5-0.02)+0.02,R0 = 0.03, dt = 0.01;
        let yValues = [R0];
        for (let i = 0; i < numSteps; i++) {
            const dW = Math.sqrt(dt) * normalDistribution();
            const res = k * (theta - yValues[i]) * dt + sigma * Math.sqrt(yValues[i]) * dW;
            yValues.push(yValues[i] + res);
        }
        addLine(xValues, yValues);
    }
    
}
//   --------------------
// Function to generate Black-Karasinski
function generateBlackKarasinski() {
    let numSteps = 100;
    const theta1 = 0.02, theta2 = 0.01, a = 0.5, sigma = 0.02, R0 = 0.015, dt = 0.01;
    let yValues = [R0];

    for (let i = 0; i < numSteps; i++) {
        const dW = Math.sqrt(dt) * normalDistribution();
        const res = ((theta1 + (theta2 * i)) - (a * Math.log(yValues[i]))) * dt + sigma * Math.sqrt(yValues[i]) * dW;
        yValues.push(yValues[i] + res);
    }
    const xValues = Array.from({ length: numSteps }, (_, i) => i);
    drawGraph(xValues, yValues, "Black-Karasinski");
}

//   --------------------
// Function to generate Heston
function generateHeston() {
    let numSteps = 100;
    const mu = 0.05, k = 0.8, theta = 0.1, sigma = 0.2, S0 = 100, v0 = 0.2, dt = 0.01;
    let yValues = [S0];
    let v_t = [v0];
    for (let i = 0; i < numSteps; i++) {
        const dW1 = Math.sqrt(dt) * normalDistribution();
        v_t.push((k * (theta - v_t[i]) * dt + sigma * Math.sqrt(v_t[i]) * dW1) + v_t[i]);

        const dW2 = Math.sqrt(dt) * normalDistribution();
        const S_t = mu * yValues[i] * dt + Math.sqrt(v_t[i]) * yValues[i] * dW2;
        yValues.push(yValues[i] + S_t);
    }
    const xValues = Array.from({ length: numSteps }, (_, i) => i);
    drawGraph(xValues, yValues, "Heston");
}

//   --------------------
// Function to generate Chen
function generateChen() {
    let numSteps = 100;

    initializeGraph("Chen");
    const xValues = Array.from({ length: numSteps }, (_, i) => i);

    for (let j = 0; j < numberOfLine; j++) {

        let R0 = 0.05, theta0 = 0.1, sigma0 = 0.05;
        let yValues = [R0]; // r_t
        let theta_t = [theta0];
        let sigma_t = [sigma0];
        let a = Math.random() * (0.3 - 0.1) + 0.1, m = Math.random() * (0.3 - 0.1) + 0.1, b = Math.random() * (0.6 - 0.1) + 0.1, mu = Math.random() * (0.3 - 0.1) + 0.1, v = Math.random() * (0.6 - 0.1) + 0.1, g = Math.random() * (0.2 - 0.1) + 0.1, dt = 0.01, k = Math.random() * (0.6 - 0.1) + 0.1;

        for (let i = 0; i < numSteps; i++) {
            const dW1 = Math.sqrt(dt) * normalDistribution();
            sigma_t.push((mu * (b - sigma_t[i]) * dt + (m * Math.sqrt(sigma_t[i])) * dW1) + sigma_t[i]);
            const dW2 = Math.sqrt(dt) * normalDistribution();
            theta_t.push(theta_t[i] + (v * (g - theta_t[i]) * dt + a * Math.sqrt(theta_t[i]) * dW2));
            const dW3 = Math.sqrt(dt) * normalDistribution();
            const r_t = ((k * (theta_t[i] - yValues[i]) * dt + Math.sqrt(yValues[i]) * Math.sqrt(sigma_t[i]) * dW3));
            yValues.push(yValues[i] + r_t);
        }

        addLine(xValues, yValues);
    }


}

//   --------------------
// Function to generate general stocastics process, it takes as input a,b,X0,dt, T and can process any EDS
function stochasticEulerMethod(a, b, X0, dt, labelGraph) {
    let numSteps = 100;
    let yValues = [X0];

    for (let i = 0; i < numSteps; i++) {
        const dW = Math.sqrt(dt) * normalDistribution();
        const k = a * (b - yValues[i]) * dt + sigma * dW; // theta * (mu - X[i]) * dt + sigma * dW;
        yValues.push(yValues[i] + k);
    }
    const xValues = Array.from({ length: numSteps }, (_, i) => i);
    drawGraph(xValues, yValues, labelGraph);
}

function normalDistribution() {
    let u = 0,
        v = 0;
    while (u === 0) u = Math.random(); // Convert [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function initializeGraph(labelGraph) {
    ctx.clearRect(0, 0, chartID.width, chartID.height);

    const myChart = new Chart(chartID, {
        type: "line",
        data: {
            labels: [], // xValues
            datasets: [
                {
                    label: labelGraph,
                    data: [], // yValues
                    borderColor: "#1E1E1E",
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            elements: {
                line: {
                    tension: 0.1,
                },
            },
            legend: {
                display: false,
            },
            tooltips: {
                enabled: false,
            },
        },
    });
    canvasArr.push(myChart);
}

function addLine(xValues, yValues) {
    let chart = canvasArr[canvasArr.length - 1];

    const color = getRandomRGBAColor();
    let newDataset = {
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

