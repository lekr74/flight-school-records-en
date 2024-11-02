// dbSetup.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./flightsData.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS flights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      instructor TEXT NOT NULL,
      student TEXT NOT NULL,
      date TEXT NOT NULL,
      flights INTEGER NOT NULL,
      comments TEXT
    )
  `);
});

db.close();
console.log("Database setup complete.");
