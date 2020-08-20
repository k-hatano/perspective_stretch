
var canvasWidth = 0;
var canvasHeight = 0;

var startTime = 0;
var currentAngle = 0;
var currentZRate = 0;

var Z_STRENGTH = 24;

onload = function() {
    startTime = (new Date()).getTime();

    heartbeat();
    resizeCanvas();
    drawCanvas();
};

onresize = function() {
    resizeCanvas();
    drawCanvas();
};

function heartbeat() {
    let currentTimeInterval = (new Date()).getTime() - startTime;
    currentAngle = (currentTimeInterval / 7) % 360;
    currentZRate = (Math.sin(currentTimeInterval / 360) + 1) * 0.6 + 0.2;

    drawCanvas();
    setTimeout("heartbeat()", 10);
}

function resizeCanvas() {
    let content = document.getElementById('content');
    let canvas = document.getElementById('canvas');
    canvasWidth = content.clientWidth;
    canvasHeight = content.clientHeight;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}

function drawCanvas() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    const w = canvasWidth;
    const h = canvasHeight;

    context.clearRect(0, 0, w, h);

    context.fillStyle = "black";

    context.beginPath();
    context.ellipse(
        w * 20 / 64 - w * currentZRate / Z_STRENGTH, 
        h * 32 / 64, 
        w * 10 / 64 * currentZRate, 
        w * 10 / 64 * currentZRate, 
        0, Math.PI * 2, false);
    context.ellipse(
        w * 46 / 64 + w * currentZRate / Z_STRENGTH, 
        h * 32 / 64, 
        w * 10 / 64 * currentZRate, 
        w * 10 / 64 * currentZRate, 
        0, Math.PI * 2, false);
    context.fill();

    context.fillStyle = "white";

    context.beginPath();
    context.ellipse(
        w * 20 / 64 - w * currentZRate / Z_STRENGTH, 
        h * 32 / 64, 
        w * 6 / 64 * currentZRate, 
        w * 6 / 64 * currentZRate, 
        0, Math.PI * 2, false);
    context.ellipse(
        w * 46 / 64 + w * currentZRate / Z_STRENGTH, 
        h * 32 / 64, 
        w * 6 / 64 * currentZRate, 
        w * 6 / 64 * currentZRate, 
        0, Math.PI * 2, false);
    context.fill();

    context.strokeStyle = "white";
    context.lineWidth = w / 16 * currentZRate;

    context.beginPath();
    context.moveTo(w * 20 / 64 - w * currentZRate / Z_STRENGTH, h * 32 / 64);
    context.lineTo(
        (w * 20 / 64) + (w * 20 / 64) * Math.cos(currentAngle / 180 * Math.PI) - w * currentZRate / Z_STRENGTH, 
        (h * 32 / 64) + (w * 20 / 64) * Math.sin(currentAngle / 180 * Math.PI)
    );
    context.stroke();

    context.beginPath();
    context.moveTo(w * 46 / 64 + w * currentZRate / Z_STRENGTH, h * 32 / 64);
    context.lineTo(
        (w * 46 / 64) + (w * 20 / 64) * Math.cos(currentAngle / 180 * Math.PI) + w * currentZRate / Z_STRENGTH, 
        (h * 32 / 64) + (w * 20 / 64) * Math.sin(currentAngle / 180 * Math.PI)
    );
    context.stroke();
}
