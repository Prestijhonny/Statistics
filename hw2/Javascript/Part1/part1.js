"use strict";

function readData() {
    const fs = require("fs");

    const tsvData = fs.readFileSync("Professional Life.tsv", "utf8");
    const rows = tsvData.split("\n");
    const firstRow = rows[0].split("\t");
    const outputData = [];

    for (let i = 1; i < rows.length; i++) {
        const line = rows[i].split("\t");
        if (line.length === firstRow.length) {
            const jsonRow = {};
            for (let j = 0; j < firstRow.length; j++)
                jsonRow[firstRow[j]] = line[j];
            outputData.push(jsonRow);
        }
    }
    return outputData;
}

function intervalCreation(d) {
    d.sort(function (a, b) { return a - b });
    let start = d[0];
    let end = d[0] + 0.15;
    let intervals = [];
    for (let i = 1; i < d.length; i++) {
        if (d[i] > end) {
            intervals.push(`${start.toFixed(2)}-${end.toFixed(2)}`);
            start = end;
            end += 0.1;
        }
    }
    intervals.push(`${start.toFixed(2)}-${Math.max(...d)}`);

    return intervals;
}
// Age, weight, dream works
function createVariable(inputData) {
    for (let i = 0; i < inputData.length; i++) {
        for (const key in inputData[i]) {
            if (key != 'Age' && key != 'weight' && key != 'Dream Works')
                delete inputData[i][key];
        }
    }
    const filteredArray = inputData.filter(item => {
        return Object.values(item).every(value => value.trim() !== '' && value.trim() !== ' ');
    });

    return filteredArray;
}

function frequencyAbsolute(variables) {
    let quantContinuous = {
        "50-": 0,
        "[50;60)": 0,
        "[60;70)": 0,
        "[70;80)": 0,
        "80+": 0,
    }, quantDiscrete = {}, qualitative = {};
    //Absolute frequency
    for (let d of variables) {
        for (const key in d) {
            if (key == 'weight') {
                if (d[key] < 50) {
                    quantContinuous["50-"] += 1;
                } else if (d[key] >= 50 && d[key] < 60) {
                    quantContinuous["[50;60)"] += 1;
                } else if (d[key] >= 60 && d[key] < 70) {
                    quantContinuous["[60;70)"] += 1;
                } else if (d[key] >= 70 && d[key] < 80) {
                    quantContinuous["[70;80)"] += 1;
                } else if (d[key] >= 80) {
                    quantContinuous["80+"] += 1;
                }

            } else if (key == 'Age') {
                if (quantDiscrete.hasOwnProperty(d[key]))
                    quantDiscrete[d[key]]++;
                else
                    quantDiscrete[d[key]] = 1;

            } else if (key == 'Dream Works') {
                if (qualitative.hasOwnProperty(d[key]))
                    qualitative[d[key]]++;
                else
                    qualitative[d[key]] = 1;
            }
        }
    }
    let outRes = [quantContinuous, quantDiscrete, qualitative];
    console.log(outRes);
    return outRes;
}

function frequencyRelative(varWithAbsFreq, total) {
    for (let d of varWithAbsFreq) {
        for (const key in d)
            d[key] = (d[key] / total).toFixed(4);
    }
    console.log(varWithAbsFreq);
    return varWithAbsFreq;
}

function frequencyPerc(varWithRelFreq, total) {
    for (let d of varWithRelFreq) {
        for (const key in d)
            d[key] = ` ${(d[key] * 100).toFixed(2)}%`;
    }
    console.log(varWithRelFreq);
    return varWithRelFreq;
}

function jointDistribution(inputData) {

    const occurrences = {};
    inputData.forEach(item => {
        const age = item.Age;
        const weight = item.weight;

        const key = `${age}-${weight}`;
        if (occurrences[key]) {
            occurrences[key]++;
        } else {
            occurrences[key] = 1;
        }
    });
    const uniqueAges = Array.from(new Set(inputData.map(item => item.Age)));
    const uniqueWeights = Array.from(new Set(inputData.map(item => item.weight)));
    const table = [['Age', ...uniqueWeights]];

    uniqueAges.forEach(age => {
        const rowData = [age];
        uniqueWeights.forEach(weight => {
            const key = `${age}-${weight}`;
            rowData.push(occurrences[key] || 0);
        });
        table.push(rowData);
    });

    console.table(table);
}



let inputData = readData();
let variables = createVariable(inputData);
let varWithAbsFreq = frequencyAbsolute(variables);
let varWithRelFreq = frequencyRelative(varWithAbsFreq, variables.length);
frequencyPerc(varWithRelFreq, variables.length);
jointDistribution(variables);