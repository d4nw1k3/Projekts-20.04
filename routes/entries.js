const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../database');
const { SECRET } = require('./auth');
const router = express.Router();

// Middleware — проверка токена
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Нет токена' });
  try {
    req.userId = jwt.verify(token, SECRET).userId;
    next();
  } catch {
    res.status(401).json({ error: 'Токен недействителен' });
  }
}

// CREATE
router.post('/', auth, (req, res) => {
  const { name, meal, date, amount, calories, protein, fat, carbs, notes } = req.body;
  if (!name || !date || !amount || calories == null)
    return res.status(400).json({ error: 'Заполни обязательные поля' });
  if (amount <= 0 || calories < 0)
    return res.status(400).json({ error: 'Некорректные значения' });

  const result = db.prepare(
    'INSERT INTO entries (user_id,name,meal,date,amount,calories,protein,fat,carbs,notes) VALUES (?,?,?,?,?,?,?,?,?,?)'
  ).run(req.userId, name, meal, date, amount, calories, protein||0, fat||0, carbs||0, notes||'');

  db.prepare("INSERT INTO logs (level, message) VALUES ('INFO', ?)").run(`Добавлен: ${name} (${calories} kcal)`);
  res.json({ id: result.lastInsertRowid });
});

// READ
router.get('/', auth, (req, res) => {
  const { date } = req.query;
  const entries = date
    ? db.prepare('SELECT * FROM entries WHERE user_id=? AND date=? ORDER BY id DESC').all(req.userId, date)
    : db.prepare('SELECT * FROM entries WHERE user_id=? ORDER BY date DESC, id DESC').all(req.userId);
  res.json(entries);
});

// UPDATE
router.put('/:id', auth, (req, res) => {
  const entry = db.prepare('SELECT * FROM entries WHERE id=? AND user_id=?').get(req.params.id, req.userId);
  if (!entry) return res.status(404).json({ error: 'Запись не найдена' });

  const { name, meal, amount, calories, protein, fat, carbs } = req.body;
  db.prepare(
    'UPDATE entries SET name=?,meal=?,amount=?,calories=?,protein=?,fat=?,carbs=? WHERE id=?'
  ).run(name, meal, amount, calories, protein||0, fat||0, carbs||0, req.params.id);

  db.prepare("INSERT INTO logs (level, message) VALUES ('INFO', ?)").run(`Изменена запись: ${name}`);
  res.json({ ok: true });
});

// DELETE
router.delete('/:id', auth, (req, res) => {
  const entry = db.prepare('SELECT * FROM entries WHERE id=? AND user_id=?').get(req.params.id, req.userId);
  if (!entry) return res.status(404).json({ error: 'Запись не найдена' });

  db.prepare('DELETE FROM entries WHERE id=?').run(req.params.id);
  db.prepare("INSERT INTO logs (level, message) VALUES ('INFO', ?)").run(`Удалена запись id=${req.params.id}`);
  res.json({ ok: true });
});

module.exports = router;