const db = require("../models");
const transporter = require('../config/email.config');
const Email = db.email;

exports.getAll = (req, res) => {
  Email.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Greška prilikom dohvatanja svih emailova."
      });
    });
};

exports.getOne = (req, res) => {
  const id = req.params.id;

  Email.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Email sa id=${id} nije pronađen.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Greška prilikom dohvatanja emaila sa id=${id}.`
      });
    });
};

exports.sendEmail = (req, res) => {
  if (!req.body.imePrezime || !req.body.email || !req.body.naslov || !req.body.poruka) {
    res.status(400).send({
      message: "Ime i prezime, email, naslov i poruka ne smeju biti prazni!"
    });
    return;
  }

  const email = {
    imePrezime: req.body.imePrezime,
    email: req.body.email,
    naslov: req.body.naslov,
    poruka: req.body.poruka
  };

  Email.create(email)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Došlo je do greške prilikom slanja emaila."
      });
    });

    const mailOptions = {
      from: 'contact@example.com',
      to: 'example@gmail.com',
      subject: email.naslov,
      text: `Ime i prezime: ${email.imePrezime}\nEmail: ${email.email}\nPoruka: ${email.poruka}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send({
          message: 'Došlo je do greške prilikom slanja e-pošte.'
        });
      } else {
        console.log('E-pošta poslata: ' + info.response);
        res.status(200).send({
          message: 'E-pošta je uspešno poslata.'
        });
      }
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Email.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Email je uspešno obrisan."
        });
      } else {
        res.send({
          message: `Email sa id=${id} nije pronađen.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Greška prilikom brisanja emaila sa id=${id}.`
      });
    });
};
