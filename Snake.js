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
let nextDirection = 37;
let gridSize = 20, tileSize = 20;
let appleX = 15, appleY = 10;
let nextX = 1, nextY = 0;
let tailSize = 3;
let snakeBody = [{x: 5, y: 10}, {x: 4, y: 10}, {x: 3, y: 10}];

function startGame() {
  print("Game Started");
  drawingInterval = setInterval(play, 200);
}

function play() {
  drawCanvas();
  drawSnake();
  moveSnake();
  eatApple();
  generateApple();
  checkCollision();
}

function drawCanvas() {
  ctx.fillStyle = canvasBackground;
  ctx.strokestyle = canvasBorder;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  for (let i = 0; i < snakeBody.length; ++i) {
    if (i == 0) {
      ctx.fillStyle = "black";
    } else {
      ctx.fillStyle = snakeColour;
    }
    ctx.strokestyle = snakeBorder;
    ctx.fillRect(snakeBody[i].x * gridSize, snakeBody[i].y * tileSize, gridSize, tileSize);
    ctx.strokeRect(snakeBody[i].x * gridSize , snakeBody[i].y * tileSize, gridSize, tileSize);
    snakeSelfIntersection(i);
  }
}

function moveSnake() {
  let snakeHead = {x: snakeBody[0].x + nextX, y: snakeBody[0].y + nextY};
  snakeBody.unshift(snakeHead);
  while (snakeBody.length > tailSize) {
    snakeBody.pop();
  }
}

function eatApple() {
  if (snakeBody[0].x == appleX && snakeBody[0].y == appleY) {
    ++tailSize;
  }
}

function generateApple() {
  if (snakeBody[0].x == appleX && snakeBody[0].y == appleY) {
    appleX = Math.floor(Math.random() * gridSize);
    appleY = Math.floor(Math.random() * tileSize);
  }
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);
}

function checkCollision() {
  if ((snakeBody[0].x < 0) || (snakeBody[0].x > gridSize - 1) || (snakeBody[0].y < 0) || (snakeBody[0].y > gridSize - 1)) {
    endGame();
  }
}

function snakeSelfIntersection(i) {
  if (snakeBody[i].x == snakeBody[0].x && snakeBody[i].y == snakeBody[0].y && i > 0) {
    endGame(); 
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
  document.getElementById("gameScoreMessage").innerHTML = "<h1>Your score: " + (tailSize - 3) + "</h1>";
  document.getElementById("startAgain").style.visibility = "visible";
}

function print(str) {
  return document.getElementById("gameStatusMesage").innerHTML = str;
}

function reStart() {
  window.location.reload();
}
