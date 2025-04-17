const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, 'SECRET');
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};

exports.authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.sendStatus(403);
  next();
};