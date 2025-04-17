const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash, role });
  res.json(user);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email : 'test@gmail.com' });
  if (!user || !(await bcrypt.compare(password, user.password))) return res.sendStatus(401);

  const token = jwt.sign({ id: user._id }, 'SECRET');
  res.json({ token, user });
});

module.exports = router;