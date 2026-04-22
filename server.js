const express = require("express");
const session = require("express-session");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle JSON and serve the /public folder
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Setup sessions for CP02
app.use(
        session({
                secret: "tic-tac-toe-secret",
                resave: false,
                saveUninitialized: false,
        }),
);

// Path to users.json - must live in /data
const usersFile = path.join(__dirname, "data", "users.json");

// Helper to read users from the JSON file
function getUsers() {
        const data = fs.readFileSync(usersFile, "utf8");
        return JSON.parse(data);
}

// Helper to save users to the JSON file
function saveUsers(users) {
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// --- AUTH ROUTES ---

// Registration Route
app.post("/register", (req, res) => {
        const { username, password } = req.body;
        const users = getUsers();

        if (users.find((u) => u.username === username)) {
                return res.status(400).json({ error: "User already exists" });
        }

        users.push({ username, password }); // Stored in plaintext for learning
        saveUsers(users);

        req.session.username = username; // Auto-login after registration
        res.json({ message: "Registered!", username });
});

// Login Route
app.post("/login", (req, res) => {
        const { username, password } = req.body;
        const users = getUsers();
        const user = users.find(
                (u) => u.username === username && u.password === password,
        );

        if (user) {
                req.session.username = username;
                res.json({ message: "Logged in!", username });
        } else {
                res.status(401).json({ error: "Invalid credentials" });
        }
});

// Logout Route
app.post("/logout", (req, res) => {
        req.session.destroy();
        res.json({ message: "Logged out" });
});

// Check current user status
app.get("/api/me", (req, res) => {
        if (req.session.username) {
                res.json({ username: req.session.username });
        } else {
                res.status(401).json({ error: "Not logged in" });
        }
});

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
