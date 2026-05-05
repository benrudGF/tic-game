// Game state
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

// DOM elements
const gameBoard = document.getElementById("game-board");
const turnIndicator = document.getElementById("turn-indicator");
const newGameBtn = document.getElementById("new-game-btn");

// Authentication handlers
document.getElementById("login-btn").addEventListener("click", async () => {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        alert(`Login successful! Welcome, ${data.username}`);
        updateUI(data.username);
    } else {
        alert("Error logging in.");
    }
});

document.getElementById("logout-btn").addEventListener("click", async () => {
    const response = await fetch("/logout", {
        method: "POST",
    });

    if (response.ok) {
        alert("Logged out successfully");
        document.getElementById("game-section").style.display = "none";
        document.getElementById("auth-section").style.display = "block";
        resetGame();
    }
});

// New Game button handler
newGameBtn.addEventListener("click", () => {
    resetGame();
    renderGameBoard();
});

async function checkAuthStatus() {
    const response = await fetch("/api/me");
    if (response.ok) {
        const data = await response.json();
        updateUI(data.username);
    }
}

function updateUI(username) {
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("game-section").style.display = "block";
    document.getElementById("welcome-message").textContent = `Welcome, ${username}!`;
    resetGame();
    renderGameBoard();
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    updateTurnIndicator();
}

function updateTurnIndicator() {
    turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
    turnIndicator.style.color = currentPlayer === 'X' ? '#1976d2' : '#e65100';
}

function renderGameBoard() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.index = i;
        cell.addEventListener("click", () => handleCellClick(i));
        gameBoard.appendChild(cell);
    }
}

function handleCellClick(index) {
    if (!gameActive || gameState[index] !== '') {
        return;
    }

    gameState[index] = currentPlayer;
    const cells = document.querySelectorAll(".cell");
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer.toLowerCase());

    if (checkWin()) {
        turnIndicator.textContent = `Player ${currentPlayer} Wins!`;
        turnIndicator.style.color = currentPlayer === 'X' ? '#1976d2' : '#e65100';
        gameActive = false;
        return;
    } else if (checkDraw()) {
        turnIndicator.textContent = "Game Ended in a Draw!";
        turnIndicator.style.color = '#4CAF50';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnIndicator();
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return gameState.every(cell => cell !== '');
}

// Initialize
checkAuthStatus();