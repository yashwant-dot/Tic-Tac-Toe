const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const cellElements = Array.from(document.querySelectorAll('[data-cell]'));
const board = document.getElementById('board');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winning-message'); 
const restartButton = document.getElementById('restartButton');
let circleTurn;
const winning_comb = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  circleTurn = false;
  cellElements.forEach(cell => {
    // Fire function only once when clicked.
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click',handleClick);
    cell.addEventListener('click',handleClick,{ once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  // place Mark
  placeMark(cell, currentClass);

  // check for win
  if(checkWin(currentClass)) {
    endGame(false);
  } else if(isDraw()) {
    endGame(true);
  } else {
    // switch turn
    swapTurns()
    // setHover class
    setBoardHoverClass();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  circleTurn ? board.classList.add(CIRCLE_CLASS) : board.classList.add(X_CLASS);
}

function checkWin(currentClass) {
  return winning_comb.some(comb => {
    return comb.every(index => cellElements[index].classList.contains(currentClass));
  })
}

function endGame(draw) {
  if(draw) {
    winningMessageTextElement.innerText = 'Draw!';
    winningMessageElement.classList.add('show');
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    winningMessageElement.classList.add('show');
  }
}

function isDraw() {
  return cellElements.every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
  });
}