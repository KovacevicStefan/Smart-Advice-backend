const db = require("../models");
const News = db.news;
const User = db.user;

exports.getAll = (req, res) => {
  News.findAll({
    include: [{
      model: db.user,
      as: 'autor',
      attributes: ['id', 'imePrezime']
    }],
    attributes: { exclude: ['autorId'] }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Greška prilikom dohvatanja svih vesti."
      });
    });
};

exports.getByUserId = (req, res) => {
  const userId = req.params.userId;

  News.findAll({
    include: [{
      model: db.user,
      as: 'autor',
      attributes: ['id', 'imePrezime']
    }],
    where: { autorId: userId },
    attributes: { exclude: ['autorId'] }
  })
    .then(data => {
      if (data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Nema vesti za korisnika sa ID-jem '${userId}'.`
        });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: `Greška prilikom dohvatanja vesti za korisnika sa ID-jem '${userId}'.`
      });
    });
};

exports.getOne = (req, res) => {
  const id = req.params.id;

  News.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Vest sa id=${id} nije pronađena.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Greška prilikom dohvatanja vesti sa id=${id}.`
      });
    });
};

exports.getByNaslov = (req, res) => {
  const naslov = req.params.naslov;

  News.findOne({
    include: [{
      model: db.user,
      attributes: ['id', 'imePrezime'],
      as: 'autor'
    }],
    where: { naslov: naslov },
    attributes: { exclude: ['autorId'] }
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Vest sa naslovom '${naslov}' nije pronađena.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Greška prilikom dohvatanja vesti sa naslovom '${naslov}'.`
      });
    });
};

exports.addNews = (req, res) => {
  if (!req.body.naslov || !req.body.tekst || !req.body.autor || !req.body.autor.id) {
    res.status(400).send({
      message: "Naslov, tekst i ID autora ne smeju biti prazni!"
    });
    return;
  }

  const news = {
    naslov: req.body.naslov,
    tekst: req.body.tekst,
    autorId: req.body.autor.id
  };

  News.create(news)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Došlo je do greške prilikom dodavanja vesti."
      });
    });
};

exports.updateNews = (req, res) => {
  const id = req.params.id;
  if (!req.body.naslov || !req.body.tekst || !req.body.autor) {
    res.status(400).send({
      message: "Naslov, tekst i autor ne smeju biti prazni!"
    });
    return;
  }

  News.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Vest sa id=${id} nije pronađena.`
        });
      } else {
        const updatedNews = {
          naslov: req.body.naslov,
          tekst: req.body.tekst,
          autor: req.body.autor
        };

        News.update(updatedNews, {
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Vest je uspešno ažurirana."
              });
            } else {
              res.send({
                message: `Vest sa id=${id} nije pronađena. Možda vest nije nađena ili zahtev ne sadrži podatke!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: `Greška prilikom ažuriranja vesti sa id=${id}.`
            });
          });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Greška prilikom dohvatanja vesti sa id=${id}.`
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  News.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Vest je uspešno obrisana."
        });
      } else {
        res.send({
          message: `Vest sa id=${id} nije pronađena.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Greška prilikom brisanja vesti sa id=${id}.`
      });
    });
};
