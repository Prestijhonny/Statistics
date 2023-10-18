"use strict";

function randomVariation(n, k) {
    let randomVar = [];
    let intervals = {};
    for (let i = 0; i < n; i++)
        randomVar.push(Math.random());

    for (let i = 0; i < k; i++)
        intervals[i / k + " - " + (i + 1) / k] = 0;

    for (let j = 0; j < n; j++) {
        for (let i = 0; i < k; i++) {
            if ((i / k) <= randomVar[j] && randomVar[j] < (i + 1) / k){
                intervals[i / k + " - " + (i + 1) / k]++;
                break;
            }
        }
    }
    return intervals;
}

function drawHistogram(intervals) {
    const svg = d3.select("svg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    const maxFrequency = Math.max(...Object.values(intervals));

    const xScale = d3.scaleBand()
        .domain(Object.keys(intervals))
        .range([0, width])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, maxFrequency])
        .nice()
        .range([height, 0]);

    svg.selectAll(".bar")
        .data(Object.entries(intervals))
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d[0]))
        .attr("y", d => yScale(d[1]))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - yScale(d[1]));

    svg.selectAll(".text")
        .data(Object.entries(intervals))
        .enter().append("text")
        .attr("class", "text")
        .attr("x", d => xScale(d[0]) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d[1]) - 5)
        .attr("text-anchor", "middle")
        .text(d => d[1]);

    svg.selectAll(".value-text")
        .data(Object.entries(intervals))
        .enter().append("text")
        .attr("class", "value-text")
        .attr("x", d => xScale(d[0]) + xScale.bandwidth() / 2)
        .attr("y", d => 600)
        .attr("text-anchor", "middle")
        .text(d => d[0]);
}

let n = 10000;
let k = 10;
let intervals = randomVariation(n, k);
console.table(intervals);
drawHistogram(intervals);