// Trent Julich
// 14 Feb. 2020

var canvas = document.getElementById("gameWorld");
var ctx = canvas.getContext("2d");

var gliderButton = document.getElementById("gliderState");
gliderButton.addEventListener("click", function(){
    cells.initializeWithGlider();
});

var randomButton = document.getElementById("randomState");
randomButton.addEventListener("click", function() {
    cells.initialize();
});

var gosperButton = document.getElementById("gosperState");
gosperButton.addEventListener("click", function() {
   cells.initializeWithGosper(); 
});

var cells = new Cells(280, 280, 2.5, ctx);
cells.initialize();
cells.draw();

var lastUpdate = Date.now();
var currentTime;
var timeStep = 100;

var loop;

function setupTimer(timeStep) {
    loop = window.setInterval(() => {
        ctx.clearRect(0, 0, 800, 800);
        cells.update();
        cells.draw();
    }, timeStep);
}

setupTimer(timeStep);
