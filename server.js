const express = require("express");
const session = require("express-session");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000; // Revert to port 3000

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "tic-tac-toe-secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Path to users.json
const usersFile = path.join(__dirname, "data", "users.json");

// Helper to read users from the JSON file
function getUsers() {
  try {
    const data = fs.readFileSync(usersFile, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
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

  if (users.some((u) => u.username === username)) {
    return res.status(400).json({ error: "User already exists" });
  }

  users.push({ username, password }); // Note: Plaintext for learning only
  saveUsers(users);

  req.session.username = username;
  res.json({ message: "Registered!", username });
});

// Login Route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();
  const user = users.find((u) => u.username === username && u.password === password);

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

// --- Start the server ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});