const jwt = require('jsonwebtoken');
const secretKey = 'hex'; // U produkciji se koristi drugačiji tajni kljuc

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Neovlašćen pristup' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Neovlašćen pristup' });
  }
};

module.exports = verifyToken;
