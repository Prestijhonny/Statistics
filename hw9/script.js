"use strict";
const chartID = "myCanvas";
const canvas1 = document.getElementById("canvas1");
const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d");
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
            // Add your code for Heston here
            break;

        case "CM":
            console.log("Chen model selected");
            // Add your code for Chen model here
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
    let numSteps = 100, mu = 0.1, sigma = 0.2, X0 = 0, dt = 0.01;

    const xValues = Array.from({ length: numSteps }, (_, i) => i);
    const yValues = [X0];

    for (let i = 0; i < numSteps; i++) {
        const dW = Math.sqrt(dt) * normalDistribution();
        const newValue = (mu * dt + sigma * dW);
        yValues.push(yValues[i] + newValue);
    }

    let labelGraph = "Arithmetic Brownian Motion";
    drawGraph(xValues, yValues, labelGraph);
}

//   --------------------
// Function to generate Geometric Brownian Motion data
function generateGeometricBrownianMotion() {
    const mu = 1;
    const sigma = 0.2;
    const dt = 0.01;
    const S0 = 1;
    const numSteps = 100;

    const xValues = Array.from({ length: numSteps }, (_, i) => i);
    const yValues = [S0];

    for (let i = 0; i < numSteps; i++) {
        const dW = Math.sqrt(dt) * normalDistribution();
        const newValue = mu * yValues[i] * dt + sigma * yValues[i] * dW;
        yValues.push(yValues[i] + newValue);
    }
    let labelGraph = "Geometric Brownian Motion";
    drawGraph(xValues, yValues, labelGraph);

}

//   --------------------
// Function to generate Ornstein-Uhlenbeck
function generateOU() {
    let theta = 1, mu = 0, sigma = Math.sqrt(2), X0 = -10, dt = 0.05;
    let numSteps = 100;
    let yValues = [X0];

    for (let i = 0; i < numSteps; i++) {
        const dW = Math.sqrt(dt) * normalDistribution();
        const k = theta * (mu - yValues[i]) * dt + sigma * dW;
        yValues.push(yValues[i] + k);
    }
    const xValues = Array.from({ length: numSteps }, (_, i) => i);
    drawGraph(xValues, yValues, "Ornstein-Uhlenbeck");
}

//   --------------------
// Function to generate Vasicek
function generateVasicek() {
    let k = 0.2, theta = 0.05, sigma = 0.1, R0 = 0, dt = 0.01;
    let numSteps = 100;
    let yValues = [R0];

    for (let i = 0; i < numSteps; i++) {
        const dW = Math.sqrt(dt) * normalDistribution();
        const rt = k * (theta - yValues[i]) * dt + sigma * Math.sqrt(dt) * dW;
        yValues.push(yValues[i] + rt);
    }
    const xValues = Array.from({ length: numSteps }, (_, i) => i);
    drawGraph(xValues, yValues, "Vasicek");
}

//   --------------------
// Function to generate Hull-White
function generateHullWhite() {
    let numSteps = 100;
    const theta1 = 0.02, theta2 = 0.01;
    const a = 0.1, sigma = 0.02, R0 = 0.015, dt = 0.01;
    let yValues = [R0];

    for (let i = 0; i < numSteps; i++) {
        const dW = Math.sqrt(dt) * normalDistribution();
        const k = ((theta1 + (theta2 * i)) - (a * yValues[i])) * dt + sigma * dW;
        yValues.push(yValues[i] + k);
    }
    const xValues = Array.from({ length: numSteps }, (_, i) => i);
    drawGraph(xValues, yValues, "Hull-White");
}

//   --------------------
// Function to generate Cox-Ingersoll-Ross
function generateCoxIngersollRoss() {
    let numSteps = 100;
    const k = 0.1, theta = 0.05, sigma = 0.02, R0 = 0.03, dt = 0.01;
    let yValues = [R0];

    for (let i = 0; i < numSteps; i++) {
        const dW = Math.sqrt(dt) * normalDistribution();
        const res = k*(theta-yValues[i])*dt + sigma*Math.sqrt(yValues[i])*dW;
        yValues.push(yValues[i] + res);
    }
    const xValues = Array.from({ length: numSteps }, (_, i) => i);
    drawGraph(xValues, yValues, "Cox-Ingersoll-Ross");
}

//   --------------------
// Function to generate Black-Karasinski
function generateBlackKarasinski(){
    let numSteps = 100;
    const theta1 = 0.02, theta2 = 0.01 , a = 0.5, sigma = 0.02, R0 = 0.015, dt = 0.01;
    let yValues = [R0];

    for (let i = 0; i < numSteps; i++) {
        const dW = Math.sqrt(dt) * normalDistribution();
        const res = ((theta1+(theta2*i))-(a*Math.log(yValues[i])))*dt + sigma*Math.sqrt(yValues[i])*dW;
        yValues.push(yValues[i] + res);
    }
    const xValues = Array.from({ length: numSteps }, (_, i) => i);
    drawGraph(xValues, yValues, "Black-Karasinski");
}

//   --------------------
// Function to generate Heston
function generateHeston(){
    let numSteps = 100;
    const theta1 = 0.02, theta2 = 0.01 , a = 0.5, sigma = 0.02, R0 = 0.015, dt = 0.01;
    let yValues = [R0];

    for (let i = 0; i < numSteps; i++) {
        const dW = Math.sqrt(dt) * normalDistribution();
        const res = ((theta1+(theta2*i))-(a*Math.log(yValues[i])))*dt + sigma*Math.sqrt(yValues[i])*dW;
        yValues.push(yValues[i] + res);
    }
    const xValues = Array.from({ length: numSteps }, (_, i) => i);
    drawGraph(xValues, yValues, "Heston");
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

const drawGraph = function (xValues, yValues, labelGraph) {
    ctx.clearRect(0, 0, chartID.width, chartID.height);
    const myChart = new Chart(chartID, {
        type: "line",
        data: {
            labels: xValues,
            datasets: [
                {
                    label: labelGraph,
                    data: yValues,
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