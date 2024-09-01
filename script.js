const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const statusDisplay = document.getElementById('game-status');
const restartButton = document.getElementById('restart-button');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.classList.add(currentPlayer);
    cell.innerText = currentPlayer;

    if (checkWin()) {
        statusDisplay.innerText = `${currentPlayer} Wins!`;
        gameActive = false;
    } else if (!gameState.includes("")) {
        statusDisplay.innerText = `It's a Tie!`;
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.innerText = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWin() {
    return winningConditions.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerText = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('X');
        cell.classList.remove('O');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
