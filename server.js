const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/entries', require('./routes/entries'));

// Логи (для страницы "Системный журнал")
app.get('/api/logs', (req, res) => {
  const db = require('./database');
  const logs = db.prepare('SELECT * FROM logs ORDER BY id DESC LIMIT 100').all();
  res.json(logs);
});

app.listen(3000, () => console.log('Сервер запущен: http://localhost:3000'));