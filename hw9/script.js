"use strict";
const chartID = "myCanvas";
const chartID2 = "myCanvas2";
const canvas1 = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const myCanvas = document.getElementById("myCanvas");
const myCanvas2 = document.getElementById("myCanvas2");
const ctx = myCanvas.getContext("2d");
const ctx2 = myCanvas2.getContext("2d");
const numberOfLine = 10;
let canvasArr = [];

function destroyCanvas() {
    for (let c of canvasArr) c.destroy();
    canvasArr.shift();
}
document.getElementById("SDE").addEventListener("change", function () {
    destroyCanvas();
    let selectedAlg = this.value;
    let inputForms = document.getElementsByClassName("input-form");
    for (let i = 0; i < inputForms.length; i++) {
        inputForms[i].style.display = "none";
    }

    switch (selectedAlg) {
        case "empty":
            console.log("No algorithm selected");
            canvas1.style.display = "none";
            canvas2.style.display = "none";
            break;

        case "AB":
            console.log("Arithmetic Brownian selected");
            document.getElementById("ABInputs").style.display = "block";
            canvas1.style.display = "none";
            canvas2.style.display = "none";
            break;

        case "GB":
            console.log("Geometric Brownian selected");
            document.getElementById("GBInputs").style.display = "block";
            canvas1.style.display = "none";
            canvas2.style.display = "none";
            break;

        case "OU":
            console.log("Ornstein-Uhlenbeck selected");
            document.getElementById("OUInputs").style.display = "block";
            canvas1.style.display = "none";
            canvas2.style.display = "none";
            break;

        case "V":
            console.log("Vasicek selected");
            document.getElementById("VInputs").style.display = "block";
            canvas1.style.display = "none";
            canvas2.style.display = "none";
            break;

        case "HW":
            console.log("Hull-White selected");
            document.getElementById("HWInputs").style.display = "block";
            canvas1.style.display = "none";
            canvas2.style.display = "none";
            break;

        case "CIR":
            console.log("Cox-Ingersoll-Ross selected");
            document.getElementById("CIRInputs").style.display = "block";
            canvas1.style.display = "none";
            canvas2.style.display = "none";
            break;

        case "BK":
            console.log("Black-Karasinski selected");
            document.getElementById("BKInputs").style.display = "block";
            canvas1.style.display = "none";
            canvas2.style.display = "none";
            break;

        case "H":
            console.log("Heston selected");
            document.getElementById("HInputs").style.display = "block";
            canvas1.style.display = "none";
            canvas2.style.display = "none";
            break;

        case "CM":
            console.log("Chen model selected");
            document.getElementById("CInputs").style.display = "block";
            canvas1.style.display = "none";
            canvas2.style.display = "none";
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
function generateArithmeticBrownianMotion(methodFlag) {
    const numSteps = parseInt(document.getElementById("ABnumSteps").value);
    const xValues = Array.from({ length: numSteps }, (_, i) => i);
    const labelGraph = "Arithmetic Brownian Motion";
    if (methodFlag == 0) {
        initializeGraph(labelGraph);
        canvas1.style.display = "block";
    } else if (methodFlag == 1) {
        initializeGraph2(labelGraph);
        canvas2.style.display = "block";
    }
    const mu = parseFloat(document.getElementById("ABmu").value);
    const sigma = parseFloat(document.getElementById("ABsigma").value);
    const X0 = parseInt(document.getElementById("ABX0").value);
    const dt = parseFloat(document.getElementById("ABdt").value);
    let yValues = [X0];
    let newValue = 0;

    for (let j = 0; j < numberOfLine; j++) {

        for (let i = 0; i < numSteps; i++) {
            const dW = Math.sqrt(dt) * normalDistribution();
            if (methodFlag == 0) { // Euler method
                newValue = (mu * dt + sigma * dW);
            } else if (methodFlag == 1) { // Runge kutta method
                const k = mu * dt + sigma * dW;
                newValue = mu * dt * k + sigma * dW;
            }
            yValues.push(yValues[i] + newValue);
            newValue = 0;
        }
        addLine(xValues, yValues, methodFlag);
        yValues = [X0];
    }

}

function clickArithmeticBrownianMotion() {
    destroyCanvas();
    generateArithmeticBrownianMotion(0);
    generateArithmeticBrownianMotion(1);
}

//   --------------------
// Function to generate Geometric Brownian Motion data
function generateGeometricBrownianMotion(methodFlag) {
    const numSteps = parseInt(document.getElementById("GBnumSteps").value);
    const xValues = Array.from({ length: numSteps }, (_, i) => i);

    let labelGraph = "Geometric Brownian Motion";
    if (methodFlag == 0) {
        initializeGraph(labelGraph);
        canvas1.style.display = "block";
    } else if (methodFlag == 1) {
        initializeGraph2(labelGraph);
        canvas2.style.display = "block";
    }

    const mu = parseFloat(document.getElementById("GBmu").value);
    const sigma = parseFloat(document.getElementById("GBsigma").value);
    const dt = parseFloat(document.getElementById("GBdt").value);
    const S0 = parseInt(document.getElementById("GBS0").value);
    let yValues = [S0];
    let newValue = 0;
    for (let j = 0; j < numberOfLine; j++) {
        for (let i = 0; i < numSteps; i++) {
            const dW = Math.sqrt(dt) * normalDistribution();
            if (methodFlag == 0) { // Euler method
                newValue = mu * yValues[i] * dt + sigma * yValues[i] * dW;
            } else if (methodFlag == 1) { // Runge kutta method
                const k = mu * yValues[i] * dt + sigma * yValues[i] * dW;;
                newValue = mu * yValues[i] * dt * k + sigma * yValues[i] * dW;
            }
            yValues.push(yValues[i] + newValue);
            newValue = 0;
        }
        addLine(xValues, yValues);
        yValues = [S0];
    }


}

function clickGeometricBrownianMotion(){
    destroyCanvas();
    generateGeometricBrownianMotion(0);
    generateGeometricBrownianMotion(1);       
}

//   --------------------
// Function to generate Ornstein-Uhlenbeck
function generateOU(methodFlag) {
    let numSteps = parseInt(document.getElementById("OUnumSteps").value);
    const xValues = Array.from({ length: numSteps }, (_, i) => i);

    if (methodFlag == 0) {
        initializeGraph("Ornstein-Uhlenbeck");
        canvas1.style.display = "block";
    } else if (methodFlag == 1) {
        initializeGraph2("Ornstein-Uhlenbeck");
        canvas2.style.display = "block";
    }
    const theta = parseInt(document.getElementById("OUtheta").value);
    const sigma = parseFloat(document.getElementById("OUsigma").value); //Math.sqrt(2)
    const X0 = parseInt(document.getElementById("OUX0").value);
    const mu = parseInt(document.getElementById("OUmu").value);;
    const dt = parseFloat(document.getElementById("OUdt").value);
    let yValues = [X0];
    let newValue = 0;

    for (let j = 0; j < numberOfLine; j++) {
        for (let i = 0; i < numSteps; i++) {
            const dW = Math.sqrt(dt) * normalDistribution();
            const k = theta * (mu - yValues[i]) * dt + sigma * dW;
            if (methodFlag == 0) { // Euler method
                newValue = theta * (mu - yValues[i]) * dt + sigma * dW;
            } else if (methodFlag == 1) { // Runge kutta method
                const k = theta * (mu - yValues[i]) * dt + sigma * dW;
                newValue = theta * (mu - (yValues[i]*k)) * dt + sigma * dW;
            }
            yValues.push(yValues[i] + newValue);
            newValue = 0;
        }
        addLine(xValues, yValues);
        yValues = [X0];
    }
}

function clickOU(methodFlag){
    destroyCanvas();
    generateOU(0);
    generateOU(1);
}


//   --------------------
// Function to generate Vasicek
function generateVasicek(methodFlag) {
    let numSteps = parseInt(document.getElementById("VnumSteps").value);
    const xValues = Array.from({ length: numSteps }, (_, i) => i);

    if (methodFlag == 0) {
        initializeGraph("Vasicek");
        canvas1.style.display = "block";
    } else if (methodFlag == 1) {
        initializeGraph2("Vasicek");
        canvas2.style.display = "block";
    }
    const k = parseFloat(document.getElementById("Vk").value);
    const theta = parseFloat(document.getElementById("Vtheta").value);
    const sigma = parseFloat(document.getElementById("Vsigma").value);
    const R0 = parseInt(document.getElementById("VR0").value)
    const dt = parseFloat(document.getElementById("Vdt").value);
    let yValues = [R0];
    let rt = 0;
    for (let j = 0; j < numberOfLine; j++) {

        for (let i = 0; i < numSteps; i++) {
            const dW = Math.sqrt(dt) * normalDistribution();
            if (methodFlag == 0){
                rt = k * (theta - yValues[i]) * dt + sigma * Math.sqrt(dt) * dW;
            }else if (methodFlag == 1){
                let val = k * (theta - yValues[i]) * dt + sigma * Math.sqrt(dt) * dW;
                rt = k * (theta - (yValues[i]*val)) * dt + sigma * Math.sqrt(dt) * dW;
            }
            yValues.push(yValues[i] + rt);
        }
        addLine(xValues, yValues);
        yValues = [R0];
    }

}


function clickVasicek(methodFlag){
    destroyCanvas();
    generateVasicek(0);
    generateVasicek(1);
}

//   --------------------
// Function to generate Hull-White
function generateHullWhite(methodFlag) {
    const numSteps = parseInt(document.getElementById("hwNumSteps").value);
    const xValues = Array.from({ length: numSteps }, (_, i) => i);

    const theta1 = parseFloat(document.getElementById("hwTheta1").value);
    const theta2 = parseFloat(document.getElementById("hwTheta2").value);
    const a = parseFloat(document.getElementById("hwA").value);
    const sigma = parseFloat(document.getElementById("hwSigma").value);;
    const R0 = parseFloat(document.getElementById("hwR0").value);
    const dt = parseFloat(document.getElementById("hwDt").value);
    let yValues = [R0];
    let newValue = 0;
    if (methodFlag == 0) {
        initializeGraph("Hull-White");
        canvas1.style.display = "block";
    } else if (methodFlag == 1) {
        initializeGraph2("Hull-White");
        canvas2.style.display = "block";
    }
    for (let j = 0; j < numberOfLine; j++) {
        for (let i = 0; i < numSteps; i++) {
            const dW = Math.sqrt(dt) * normalDistribution();
            if (methodFlag == 0) {
                newValue = ((theta1 + (theta2 * i)) - (a * yValues[i])) * dt + sigma * dW;
            } else if (methodFlag == 1) {
                const k = ((theta1 + (theta2 * i)) - (a * yValues[i])) * dt + sigma * dW;
                newValue = ((theta1 + (theta2 * i*k)) - (a * yValues[i])) * dt + sigma * dW;
            }   
            yValues.push(yValues[i] + newValue);
            newValue = 0;
        }
        addLine(xValues, yValues);
        yValues = [R0];
    }

}

function clickHullWhite(methodFlag){
    destroyCanvas();
    generateHullWhite(0);
    generateHullWhite(1);
}

//   --------------------
// Function to generate Cox-Ingersoll-Ross
function generateCoxIngersollRoss(methodFlag) {
    const numSteps = parseInt(document.getElementById("CIRNumSteps").value);
    const xValues = Array.from({ length: numSteps }, (_, i) => i);
    
    if (methodFlag == 0){
        initializeGraph("Cox-Ingersoll-Ross");
        canvas1.style.display = "block";
    }else if (methodFlag == 1){
        initializeGraph2("Cox-Ingersoll-Ross");
        canvas2.style.display = "block";
    }
    const k = parseFloat(document.getElementById("CIRK").value);
    const theta = parseFloat(document.getElementById("CIRTheta").value);
    const sigma = parseFloat(document.getElementById("CIRSigma").value);
    const R0 = parseFloat(document.getElementById("CIRR0").value);
    const dt = parseFloat(document.getElementById("CIRdt").value);
    let yValues = [R0];
    let newValue = 0;
    for (let j = 0; j < numberOfLine; j++) {
        for (let i = 0; i < numSteps; i++) {
            const dW = Math.sqrt(dt) * normalDistribution();
            
            if (methodFlag == 0){
                newValue =  k * (theta - yValues[i]) * dt + sigma * Math.sqrt(yValues[i]) * dW;
            }else if (methodFlag == 1){
                let val =  k * (theta - yValues[i]) * dt + sigma * Math.sqrt(yValues[i]) * dW;
                newValue =  k * (theta - (yValues[i]*val)) * dt + sigma * Math.sqrt(yValues[i]) * dW;
            }
            yValues.push(yValues[i] + newValue);
            newValue = 0;
        }
        addLine(xValues, yValues);
        yValues = [R0];
    }

}

function clickCoxIngersollRoss(){
    destroyCanvas();
    generateCoxIngersollRoss(0);
    generateCoxIngersollRoss(1);
}

//   --------------------
// Function to generate Black-Karasinski
function generateBlackKarasinski() {
    destroyCanvas();
    canvas1.style.display = "block";
    canvas2.style.display = "block";
    const numSteps = parseInt(document.getElementById("bkNumSteps").value);
    initializeGraph("Black-Karasinski");
    const xValues = Array.from({ length: numSteps }, (_, i) => i);
    const theta1 = parseFloat(document.getElementById("BKTheta1").value);
    const theta2 = parseFloat(document.getElementById("BKTheta2").value);
    const a = parseFloat(document.getElementById("BKA").value);
    const sigma = parseFloat(document.getElementById("BKSigma").value);
    const R0 = parseFloat(document.getElementById("BKR0").value);
    const dt = parseFloat(document.getElementById("BKDt").value);
    let yValues = [R0];

    for (let j = 0; j < numberOfLine; j++) {

        for (let i = 0; i < numSteps; i++) {
            const dW = Math.sqrt(dt) * normalDistribution();
            const res = ((theta1 + (theta2 * i)) - (a * Math.log(yValues[i]))) * dt + sigma * Math.sqrt(yValues[i]) * dW;
            yValues.push(yValues[i] + res);
        }
        addLine(xValues, yValues);
        yValues = [R0];
    }
}

//   --------------------
// Function to generate Heston
function generateHeston() {
    destroyCanvas();
    canvas1.style.display = "block";
    canvas2.style.display = "block";
    let numSteps = parseInt(document.getElementById("hNumSteps").value);
    const xValues = Array.from({ length: numSteps }, (_, i) => i);
    initializeGraph("Heston");
    const mu = parseFloat(document.getElementById("HMu").value);
    const k = parseFloat(document.getElementById("HK").value);
    const theta = parseFloat(document.getElementById("HTheta").value);
    const sigma = parseFloat(document.getElementById("HSigma").value);
    const S0 = parseInt(document.getElementById("HS0").value);
    const v0 = parseFloat(document.getElementById("HV0").value);
    const dt = parseFloat(document.getElementById("HDt").value);
    let yValues = [S0];
    let v_t = [v0];

    for (let j = 0; j < numberOfLine; j++) {
        for (let i = 0; i < numSteps; i++) {
            const dW1 = Math.sqrt(dt) * normalDistribution();
            v_t.push((k * (theta - v_t[i]) * dt + sigma * Math.sqrt(v_t[i]) * dW1) + v_t[i]);
            const dW2 = Math.sqrt(dt) * normalDistribution();
            const S_t = mu * yValues[i] * dt + Math.sqrt(v_t[i]) * yValues[i] * dW2;
            yValues.push(yValues[i] + S_t);
        }
        addLine(xValues, yValues);
        yValues = [S0];
        v_t = [v0];
    }
}

//   --------------------
// Function to generate Chen
function generateChen() {
    destroyCanvas();
    canvas1.style.display = "block";
    canvas2.style.display = "block";
    let numSteps = parseInt(document.getElementById("cNumSteps").value);

    initializeGraph("Chen");
    const xValues = Array.from({ length: numSteps }, (_, i) => i);
    const R0 = parseFloat(document.getElementById("CR0").value);
    const theta0 = parseFloat(document.getElementById("CTheta0").value);
    const sigma0 = parseFloat(document.getElementById("CSigma0").value);
    const a = parseFloat(document.getElementById("CA").value);
    const b = parseFloat(document.getElementById("CB").value);
    const m = parseFloat(document.getElementById("CM").value);
    const mu = parseFloat(document.getElementById("CMu").value);
    const v = parseFloat(document.getElementById("CV").value);
    const g = parseFloat(document.getElementById("CG").value);
    const dt = parseFloat(document.getElementById("CDt").value)
    const k = parseFloat(document.getElementById("CK").value);
    let yValues = [R0];
    let theta_t = [theta0];
    let sigma_t = [sigma0];

    for (let j = 0; j < numberOfLine; j++) {
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
        yValues = [R0];
        theta_t = [theta0];
        sigma_t = [sigma0];
    }


}

//   --------------------
// Function to generate general stocastics process, it takes as input a,b,sigma,X0,dt, T and can process any EDS
function stochasticEulerMethod(a, b, X0, sigma, dt, labelGraph) {
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

//   --------------------
// Function to generate general stocastics process, it takes as input a,b,sigma,X0,dt, T and can process any EDS
function stochasticRungeKuttaMethod(a, b, X0, sigma, dt, T) {
    const numSteps = 100;
    let X = [X0];

    for (let i = 0; i < numSteps; i++) {
        const dW1 = Math.sqrt(dt) * normalDistribution();
        const k1 = a * (b - X[i]) * dt + sigma * dW1;
        const dW2 = Math.sqrt(dt) * normalDistribution();
        const k2 = a * (b - (X[i] + 0.5 * k1)) * dt + sigma * dW2;

        const increment = k2;
        X.push(X[i] + increment);
    }

    return X;
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
            title: {
                display: true,
                text: 'Euler method',
            },
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

function initializeGraph2(labelGraph) {
    ctx2.clearRect(0, 0, chartID2.width, chartID2.height);

    const myChart2 = new Chart(chartID2, {
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
            responsive: true,
            title: {
                display: true,
                text: 'Runge kutta method',
            },
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
    canvasArr.push(myChart2);
}

function addLine(xValues, yValues) {

    const color = getRandomRGBAColor();
    let newDataset = {
        fill: false,
        lineTension: 0,
        backgroundColor: color,
        borderColor: color,
        data: yValues
    };
    canvasArr[canvasArr.length-1].data.datasets.push(newDataset);
    canvasArr[canvasArr.length-1].data.labels = xValues;
    canvasArr[canvasArr.length-1].update();
}

