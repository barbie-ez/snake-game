const grid = document.querySelector(".grid");

const startBtn = document.getElementById("start");

const scoreDisplay = document.getElementById("score");

let squares = [];

let direction = 1;

let currentSnake = [2, 1, 0];

const width = 10;

let appleIndex = 0;

let score = 0;

let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;
function createGrid() {
  for (let i = 1; i <= width * width; i++) {
    const element = document.createElement("div");

    element.classList.add("square");

    grid.appendChild(element);

    squares.push(element);
  }
}

createGrid();

currentSnake.forEach((node) => squares[node].classList.add("snake"));

function startgame() {
  currentSnake.forEach((node) => squares[node].classList.remove("snake"));
  squares[appleIndex].classList.remove("apple");
  clearInterval(timerId);
  direction = 1;
  currentSnake = [2, 1, 0];
  score = 0;
  scoreDisplay.textContent = score;
  intervalTime = 1000;
  generateApples();
  currentSnake.forEach((node) => squares[node].classList.add("snake"));
  timerId = setInterval(move, intervalTime);
}

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) || //if snake has hit bottom
    (currentSnake[0] % width === width - 1 && direction === 1) || //if snake has hit right wall
    (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
    (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
    squares[currentSnake[0] + direction].classList.contains("snake")
  )
    return clearInterval(timerId);

  const tail = currentSnake.pop();

  squares[tail].classList.remove("snake");

  currentSnake.unshift(currentSnake[0] + direction);

  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    squares[tail].classList.add("snake");
    currentSnake.push(tail);
    generateApples();
    score++;

    document.getElementById("score").textContent = score;

    clearInterval(timerId);
    intervalTime = intervalTime * speed;

    timerId = setInterval(move, intervalTime);
  }

  squares[currentSnake[0]].classList.add("snake");
}

function generateApples() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}

generateApples();
function control(e) {
  if (e.keyCode === 39) {
    console.log("right pressed");
    direction = 1;
  } else if (e.keyCode === 38) {
    console.log("up pressed");
    direction = -width;
  } else if (e.keyCode === 37) {
    console.log("left pressed");
    direction = -1;
  } else if (e.keyCode === 40) {
    console.log("down pressed");
    direction = +width;
  }
}

document.addEventListener("keydown", control);
startBtn.addEventListener("click", startgame);
