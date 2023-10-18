"use strict";

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

function createVariable(){
    let xlsx = require("xlsx");
    let fileName = "Professional Life.xlsx";
    const data = xlsx.readFile(fileName);
    const sheet = data.Sheets[data.SheetNames[0]];
    const range = ['Q', 'S', 'Z'];
    const MAX_ROWS = 64;
    let res = {};
    let out = [];
    let j = 0;
    range.forEach((col) => {
        res[col] = [];
        let frequencyAbs = {};
        for (let i = 2; i < MAX_ROWS; i++) {
            let cellData = sheet[`${col}${i}`] ? sheet[`${col}${i}`].v : '';
            if (cellData != '') {
                if (col != 'S')
                    cellData = cellData.toString().trim();
                res[col].push(cellData);
            }
        }
        res[col].forEach((value) => {
            if (frequencyAbs[value])
                frequencyAbs[value]++;
            else
                frequencyAbs[value] = 1;
        });
        if (col == 'S') 
            res[col] = intervalCreation(res[col]);
        let ind = j+1
        out[range[j]] = {};
        out[range[j]]["Variable "+ ind] = res[col];
        out[range[j]]["Frequencies"] = {};
        out[range[j]]["Frequencies"]["Absolute"] = frequencyAbs.data;
        out[range[j]]["Frequencies"]["Relative"] = {};
        out[range[j]]["Frequencies"]["Percentage"] = {};
        j++;
    });

    return out;
}

function jointDistribution(variables, k){
    
}

let variables = createVariable();
//let jVar = jointDistribution(variables, k);

console.log(variables);