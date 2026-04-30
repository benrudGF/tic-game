import fs from 'fs';
import path from 'path';

// Paths to JSON files
const DATA_DIR = path.join(__dirname, '../../../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const GAMES_FILE = path.join(DATA_DIR, 'games.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize empty files if they don't exist
if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, '[]');
if (!fs.existsSync(GAMES_FILE)) fs.writeFileSync(GAMES_FILE, '[]');

// Helper to read JSON file
export function readJsonFile<T>(filePath: string): T[] {
  const data = fs.readFileSync(filePath, 'utf-8');
  return data ? JSON.parse(data) : [];
}

// Helper to write JSON file
export function writeJsonFile<T>(filePath: string, data: T[]): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// User type
export interface User {
  username: string;
  password: string;
  createdAt: string;
  lastLogin: string;
}

// Game type
export interface GameMove {
  player: string;
  position: number;
  timestamp: string;
}

export interface Game {
  id: string;
  players: string[];
  board: string[];
  currentPlayer: string;
  status: 'in_progress' | 'completed' | 'draw';
  winner: string | null;
  moves: GameMove[];
  createdAt: string;
  endedAt: string | null;
}

// User-specific helpers
export function getUsers(): User[] {
  return readJsonFile<User>(USERS_FILE);
}

export function addUser(user: { username: string; password: string }): void {
  const users = getUsers();
  users.push({
    ...user,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  });
  writeJsonFile<User>(USERS_FILE, users);
}

export function updateUserLogin(username: string): void {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.username === username);
  if (userIndex !== -1) {
    users[userIndex].lastLogin = new Date().toISOString();
    writeJsonFile<User>(USERS_FILE, users);
  }
}

// Game-specific helpers
export function getGames(): Game[] {
  return readJsonFile<Game>(GAMES_FILE);
}

export function saveGame(game: Game): void {
  const games = getGames();
  games.push(game);
  writeJsonFile<Game>(GAMES_FILE, games);
}

export function updateGame(gameId: string, updatedGame: Partial<Game>): void {
  const games = getGames();
  const gameIndex = games.findIndex(g => g.id === gameId);
  if (gameIndex !== -1) {
    games[gameIndex] = { ...games[gameIndex], ...updatedGame };
    writeJsonFile<Game>(GAMES_FILE, games);
  }
}