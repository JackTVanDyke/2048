const gridDisplay = document.querySelector(".grid");
const scoreDisplay = document.querySelector(".score");
const restartBtn = document.querySelector(".restart");
const width = 4;
let squares = [];
let score = 0;
//create squares for playing board by using for loop and create element
function createBoard() {
  for (let i = 0; i < width * width; i++) {
    square = document.createElement("div");
    square.innerHTML = 0;
    gridDisplay.appendChild(square);
    squares.push(square);
  }
  generateNum();
  generateNum();
}

createBoard();

//generate a random number
function generateNum() {
  randomNumber = Math.floor(Math.random() * squares.length);
  if (squares[randomNumber].innerHTML == 0) {
    squares[randomNumber].innerHTML = 2;
    checkGameOver();
  } else generateNum();
}

//swipe right
function moveRight() {
  for (let i = 0; i < 16; i++) {
    if (i % 4 === 0) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + 1].innerHTML;
      let totalThree = squares[i + 2].innerHTML;
      let totalFour = squares[i + 3].innerHTML;
      let row = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

      let filteredRow = row.filter((num) => num);
      let missing = 4 - filteredRow.length;
      let zeros = Array(missing).fill(0);
      let newRow = zeros.concat(filteredRow);
      squares[i].innerHTML = newRow[0];
      squares[i + 1].innerHTML = newRow[1];
      squares[i + 2].innerHTML = newRow[2];
      squares[i + 3].innerHTML = newRow[3];
    }
  }
}

//swipe left
function moveLeft() {
  for (let i = 0; i < 16; i++) {
    if (i % 4 === 0) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + 1].innerHTML;
      let totalThree = squares[i + 2].innerHTML;
      let totalFour = squares[i + 3].innerHTML;
      let row = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];
      let filteredRow = row.filter((num) => num);
      let missing = 4 - filteredRow.length;
      let zeros = Array(missing).fill(0);
      let newRow = filteredRow.concat(zeros);
      squares[i].innerHTML = newRow[0];
      squares[i + 1].innerHTML = newRow[1];
      squares[i + 2].innerHTML = newRow[2];
      squares[i + 3].innerHTML = newRow[3];
    }
  }
}

//swipe down
function moveDown() {
  for (let i = 0; i < 4; i++) {
    let totalOne = squares[i].innerHTML;
    let totalTwo = squares[i + 4].innerHTML;
    let totalThree = squares[i + 8].innerHTML;
    let totalFour = squares[i + 12].innerHTML;
    let column = [
      parseInt(totalOne),
      parseInt(totalTwo),
      parseInt(totalThree),
      parseInt(totalFour),
    ];

    let filteredColumn = column.filter((num) => num);
    let missing = 4 - filteredColumn.length;
    let zeros = Array(missing).fill(0);
    let newColumn = zeros.concat(filteredColumn);
    squares[i].innerHTML = newColumn[0];
    squares[i + 4].innerHTML = newColumn[1];
    squares[i + 8].innerHTML = newColumn[2];
    squares[i + 12].innerHTML = newColumn[3];
  }
}

//swipe up
function moveUp() {
  for (let i = 0; i < 4; i++) {
    let totalOne = squares[i].innerHTML;
    let totalTwo = squares[i + 4].innerHTML;
    let totalThree = squares[i + 8].innerHTML;
    let totalFour = squares[i + 12].innerHTML;
    let column = [
      parseInt(totalOne),
      parseInt(totalTwo),
      parseInt(totalThree),
      parseInt(totalFour),
    ];

    let filteredColumn = column.filter((num) => num);
    let missing = 4 - filteredColumn.length;
    let zeros = Array(missing).fill(0);
    let newColumn = filteredColumn.concat(zeros);
    squares[i].innerHTML = newColumn[0];
    squares[i + 4].innerHTML = newColumn[1];
    squares[i + 8].innerHTML = newColumn[2];
    squares[i + 12].innerHTML = newColumn[3];
  }
}

function combineRow() {
  for (let i = 0; i < 15; i++) {
    if (squares[i].innerHTML === squares[i + 1].innerHTML) {
      let combinedTotal =
        parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
      squares[i].innerHTML = combinedTotal;
      squares[i + 1].innerHTML = 0;
      score += combinedTotal;
      scoreDisplay.innerHTML = score;
    }
  }
  checkWin();
}

function combineColumn() {
  for (let i = 0; i < 12; i++) {
    if (squares[i].innerHTML === squares[i + 4].innerHTML) {
      let combinedTotal =
        parseInt(squares[i].innerHTML) + parseInt(squares[i + 4].innerHTML);
      squares[i].innerHTML = combinedTotal;
      squares[i + 4].innerHTML = 0;
      score += combinedTotal;
      scoreDisplay.innerHTML = score;
    }
  }
  checkWin();
}

//assign keycodes
function control(e) {
  if (e.keyCode === 39) {
    moveRight();
    combineRow();
    moveRight();
    generateNum();
  } else if (e.keyCode === 37) {
    moveLeft();
    combineRow();
    moveLeft();
    generateNum();
  } else if (e.keyCode === 38) {
    moveUp();
    combineColumn();
    moveUp();
    generateNum();
  } else if (e.keyCode === 40) {
    moveDown();
    combineColumn();
    moveDown();
    generateNum();
  }
}

document.addEventListener("keyup", control);

//check for number 2048
function checkWin() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].innerHTML == 2048) {
      alert("You Win!");
      document.removeEventListener("keyup", control);
    }
  }
}

//check for game over
function checkGameOver() {
  let zeros = 0;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].innerHTML == 0) {
      zeros++;
    }
  }
  if (zeros === 0) {
    alert("Game Over!");
    document.removeEventListener("keyup", control);
  }
}

//restart game
function restart() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].innerHTML = 0;
  }
  generateNum();
  generateNum();
  document.addEventListener("keyup", control);
  score = 0;
  scoreDisplay.innerHTML = score;
}

restartBtn.addEventListener("click", restart);
