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
            //   ---------------- theta, mu, sigma, X0, dt
            stochasticEulerMethod(0.1, 0.5, 0.2, 0.1, 0.01, "Ornstein-Uhlenbeck");
            break;

        case "V":
            console.log("Vasicek selected");
            //   ---------------- a,b,sigma,R0, dt
            generateCIR_VAS(0.2, 0.05, 0.1, 0.03, 0.01, "Vasicek");
            break;

        case "HW":
            console.log("Hull-White selected");
            generateHullWhite();
            break;

        case "CIR":
            console.log("Cox-Ingersoll-Ross selected");
            generateCIR_VAS(0.1,0.05,0.02,0.03,0.01, "Cox-Ingersoll-Ross");
            break;

        case "BK":
            console.log("Black-Karasinski selected");
            // Add your code for Heston here
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
    let numSteps = 100, initialValue = 0, volatility = 0.5;

    const xValues = Array.from({ length: numSteps }, (_, i) => i);
    const yValues = [initialValue];

    for (let i = 1; i < numSteps; i++) {
        const randomStep = Math.random();
        const priceChange = randomStep * volatility - volatility / 2;
        const newValue = yValues[i - 1] + priceChange;
        yValues.push(newValue);
    }
    let labelGraph = "Arithmetic Brownian Motion";
    drawGraph(xValues, yValues, labelGraph);
}

//   --------------------
// Function to generate Geometric Brownian Motion data
function generateGeometricBrownianMotion() {
    const mu = 0.1;    // rendimento atteso
    const sigma = 0.2;  // volatilità
    const n = 100;      // numero di passi
    const dt = 0.1;     // intervallo temporale tra i passi
    const x0 = 100;     // valore iniziale

    const xValues = Array.from({ length: x0 }, (_, i) => i);
    let yValues = [x0];

    for (let i = 0; i < n - 1; i++) {
        const drift = (mu - (sigma ** 2) / 2) * dt;
        const stochasticTerm = sigma * Math.sqrt(dt) * (Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random()));
        const nextValue = yValues[i] * Math.exp(drift + stochasticTerm);
        yValues.push(nextValue);
    }
    let labelGraph = "Geometric Brownian Motion";
    drawGraph(xValues, yValues, labelGraph);

}
//   --------------------
// Function to generate general stocasti process, it takes as input a,b,X0,dt, T
function stochasticEulerMethod(a, b, X0, dt, labelGraph) {
    let numSteps = 100;
    let yValues = [X0];

    for (let i = 0; i < numSteps; i++) {
        const dW = Math.sqrt(dt) * normalDistribution();
        const k = a*(b - yValues[i]) * dt + X0 * dW; // theta * (mu - X[i]) * dt + sigma * dW;
        yValues.push(yValues[i] + k);
    }
    const xValues = Array.from({ length: numSteps }, (_, i) => i);
    drawGraph(xValues, yValues, labelGraph);
}

function generateCIR_VAS(a, b, X0, dt, label){
    let numSteps = 100;
    let yValues = [X0];

    for (let i = 0; i < numSteps; i++) {
        const dW = Math.sqrt(dt) * normalDistribution();
        const k = a*(b - yValues[i]) * dt + X0 * dW* Math.sqrt(dt); // theta * (mu - X[i]) * dt + sigma * dW * sqrt(dt);
        yValues.push(yValues[i] + k);
    }
    const xValues = Array.from({ length: numSteps }, (_, i) => i);
    drawGraph(xValues, yValues, label);
}

function generateHullWhite(){
    let numSteps = 100;
    let yValues = [X0];
    const theta = 0.02;
    for (let i = 0; i < numSteps; i++) {
        const dW = Math.sqrt(dt) * normalDistribution();
        const k = ((theta+0.01*i) - a*yValues[i]) * dt + X0 * dW; // theta * (mu - X[i]) * dt + sigma * dW;
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
                    borderColor: getRandomRGBAColor(),
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