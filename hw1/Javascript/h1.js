let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

// Draw a point
let x0 = canvas.width / 2;
let y0 = 50;
let radius = 10;
context.fillStyle = "blue";
context.beginPath();
context.arc(x0, y0, radius, 0, 2 * Math.PI);
context.fill();

// Draw a line
x0 = 100;
let x1 = 700;
y0 = 100;
let y1 = 100;
context.strokeStyle = "red";
context.lineWidth = 2;
context.beginPath();
context.moveTo(x0, y0);
context.lineTo(x1, y1);
context.stroke();

// Draw a circle
x0 = canvas.width / 2;
y0 = 250;
radius = 100;
context.fillStyle = "green";
context.beginPath();
context.arc(x0, y0, radius, 0, 2 * Math.PI);
context.fill();

// Draw a rectangle
let x = 100;
let y = 400;
let width = 600;
let height = 100;
context.fillStyle = "black";
context.fillRect(x, y, width, height);
