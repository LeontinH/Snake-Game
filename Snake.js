window.onload = function() {
  let canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  document.addEventListener("keydown", keyDownEvent);
  document.getElementById("startAgain").style.visibility = "hidden";
  startGame();
};

const canvasBorder = "black";
const canvasBackground = "lightgreen";
const snakeColour = "yellow";
const snakeBorder = "black";
let drawingInterval;
let nextDirection;

function startGame() {
  print("Game Started");
  drawingInterval = setInterval(draw, 200);
}
  
let gridSize = 20, tileSize = 20;
let snakeX = 5, snakeY = 10;
let appleX = 15, appleY = 10;
let nextX = 0, nextY = 0;
let tailSize = 1;
let snakeBody = [];

function draw() {
  ctx.fillStyle = canvasBackground;
  ctx.strokestyle = canvasBorder;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  snakeX += nextX;
  snakeY += nextY;
  if ((snakeX < 0) || (snakeX > gridSize - 1) || (snakeY < 0) || (snakeY > gridSize - 1)) {
    endGame();
  }
  if (snakeX == appleX && snakeY == appleY) {
    ++tailSize;
    appleX = Math.floor(Math.random() * gridSize);
    appleY = Math.floor(Math.random() * tileSize);
  }

  for (var i = 0; i < snakeBody.length; ++i) {
    if (i == tailSize - 1) {
      ctx.fillStyle = "black";
    } else {
      ctx.fillStyle = snakeColour;
    }
    ctx.strokestyle = snakeBorder;
    ctx.fillRect(snakeBody[i].x * gridSize, snakeBody[i].y * tileSize, gridSize, tileSize);
    ctx.strokeRect(snakeBody[i].x * gridSize , snakeBody[i].y * tileSize, gridSize, tileSize);

    if (snakeBody[i].x == snakeX && snakeBody[i].y == snakeY && tailSize > 1) {
      endGame(); 
    }
  }

  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

  snakeBody.push({x: snakeX, y: snakeY});
  while (snakeBody.length > tailSize) {
    snakeBody.shift();
  }
}

function keyDownEvent(e) {
  if ((nextDirection - e.keyCode) % 2 != 0 ) {
    nextDirection = e.keyCode;
    if (e.key == "ArrowLeft") {
      nextX = -1;
      nextY = 0;
    } else if (e.key == "ArrowUp") {
      nextX = 0;
      nextY = -1;
    } else if (e.key == "ArrowRight") {
      nextX = 1;
      nextY = 0;
    } else if (e.key == "ArrowDown") {
      nextX = 0;
      nextY = 1;
    } 
  }
}

function endGame() {
    clearInterval(drawingInterval);
    print("Game Over");
    document.getElementById("gameScoreMessage").innerHTML = "<h1>Your score: " + (tailSize - 1) + "</h1>";
    document.getElementById("startAgain").style.visibility = "visible";
}

function print(str) {
  return document.getElementById("gameStatusMesage").innerHTML = str;
}

function reStart() {
  window.location.reload();
}