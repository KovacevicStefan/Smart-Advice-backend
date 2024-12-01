const jwt = require('jsonwebtoken');
const db = require("../models");
const secretKey = 'hex'; // U produkciji se koristi drugačiji tajni kljuc

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  db.user.findOne({
    where: {
      username: username,
      password: password
    }
  })
  .then(user => {
    if (user) {
      const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
      
      res.json({
        token,
        user: {
          id: user.id,
          imePrezime: user.imePrezime,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          admin: user.admin,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      });
    } else {
      res.status(401).json({ error: 'Neuspela prijava' });
    }
  })
  .catch(err => {
    console.log("Greška prilikom provere kredencijala:", err);
    res.status(500).json({ error: 'Greška prilikom prijave' });
  });
};

exports.updatePassword = (req, res) => {
  const { userId, newPassword } = req.body;

  if (!userId || !newPassword) {
    return res.status(400).json({ error: 'Nedostaje ID korisnika ili nova lozinka' });
  }

  db.user.update(
    { password: newPassword },
    { where: { id: userId } }
  )
  .then(result => {
    if (result[0] === 0) {
      res.status(404).json({ error: 'Korisnik nije pronađen' });
    } else {
      res.json({ message: 'Lozinka je uspešno promenjena' });
    }
  })
  .catch(err => {
    console.log("Greška prilikom ažuriranja lozinke:", err);
    res.status(500).json({ error: 'Greška prilikom promene lozinke' });
  });
};
