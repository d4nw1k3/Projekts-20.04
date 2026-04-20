const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');
const router = express.Router();

const SECRET = 'твой_секретный_ключ_замени_это';

router.post('/register', (req, res) => {
  const { name, email, password, calorieGoal } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: 'Заполни все поля' });
  if (password.length < 6)
    return res.status(400).json({ error: 'Пароль минимум 6 символов' });

  const hash = bcrypt.hashSync(password, 10);
  try {
    db.prepare(
      'INSERT INTO users (name, email, password_hash, calorie_goal) VALUES (?, ?, ?, ?)'
    ).run(name, email.toLowerCase(), hash, calorieGoal || 2000);
    db.prepare("INSERT INTO logs (level, message) VALUES ('INFO', ?)").run('Новый пользователь: ' + email);
    res.json({ ok: true });
  } catch (e) {
    res.status(409).json({ error: 'Email уже зарегистрирован' });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase());
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    db.prepare("INSERT INTO logs (level, message) VALUES ('WARN', ?)").run('Неудачный вход: ' + email);
    return res.status(401).json({ error: 'Неверный email или пароль' });
  }
  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '7d' });
  db.prepare("INSERT INTO logs (level, message) VALUES ('INFO', ?)").run('Вход: ' + email);
  res.json({ token, user: { name: user.name, email: user.email, calorieGoal: user.calorie_goal } });
});

module.exports = router;
module.exports.SECRET = SECRET;