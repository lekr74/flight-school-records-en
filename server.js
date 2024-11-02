// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serves static files like index.html

// Endpoint to handle chatbot data
app.post('/submit', (req, res) => {
  const { instructor, student, date, flights, comments } = req.body;
  const db = new sqlite3.Database('./flightsData.db');
  db.run(
    `INSERT INTO flights (instructor, student, date, flights, comments) VALUES (?, ?, ?, ?, ?)`,
    [instructor, student, date, flights, comments || ''],
    function (err) {
      db.close();
      if (err) {
        res.status(500).send({ status: 'error', message: err.message });
      } else {
        res.send({ status: 'success' });
      }
    }
  );
});

// Endpoint to fetch data for results.html
app.get('/results', (req, res) => {
  const db = new sqlite3.Database('./flightsData.db');
  db.all(`SELECT * FROM flights`, (err, rows) => {
    db.close();
    if (err) {
      res.status(500).send({ status: 'error', message: err.message });
    } else {
      res.send(rows);
    }
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
