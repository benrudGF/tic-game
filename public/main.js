document.getElementById("register-btn").addEventListener("click", async () => {
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;

    const response = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        alert(`Registration successful! Welcome, ${data.username}`);
        updateUI(data.username);
    } else {
        alert("Error registering user.");
    }
});

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
    }
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
    renderGameBoard();
}

function renderGameBoard() {
    const board = document.getElementById("game-board");
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.index = i;
        cell.addEventListener("click", () => handleCellClick(i));
        board.appendChild(cell);
    }
}

function handleCellClick(index) {
    const cells = document.querySelectorAll(".cell");
    if (!cells[index].textContent) {
        cells[index].textContent = "X"; // Example: Always X for demo
    }
}

checkAuthStatus();