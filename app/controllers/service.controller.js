const db = require("../models");
const Service = db.service;

exports.getAll = (req, res) => {
    Service.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Greška prilikom dohvatanja svih usluga."
        });
      });
};

exports.getOne = (req, res) => {
  const id = req.params.id;

  Service.findByPk(id)
    .then(data => {
      if(data) {
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

exports.addService = (req, res) => {

  const service = {
    text: req.body.text,
    slika: req.body.slika
  };

  Service.create(service)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Došlo je do greške prilikom dodavanja usluge"
    })
  })
}

exports.updateService = (req, res) => {

  const id = req.params.id;
  if(!req.body.text || !req.body.slika) {
    res.status(400).send({
      message: "Slika i tekst moraju da postoje."
    });
    return;
  }
  Service.findByPk(id)
    .then(data => {
      if(!data) {
        res.status(404).send({
          message: `Usluga sa id=${id} nije pronadjena`
        });
      }else {
        const updatedService = {
          slika: req.body.slika,
          text: req.body.text
        };

        Service.update(updatedService, {
          where: { id: id}
        })
          .then(num => {
            if(num == 1) {
              res.send({
                message: "Usluga je uspešno ažurirana."
              });
            } else {
              res.send({
                message: `Usluga sa id=${id} nije pronađena`
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
        message: `Greška prilikom dohvatanja usluge sa id=${id}.`
      });
    });
};

exports.deleteService = (req, res) => {
  const id = req.params.id;

  Service.destroy({
    where: { id: id}
  })
    .then(num => {
      if(num == 1) {
        res.send({
          message: "Usluga je uspešno uklonjena."
        });
      } else {
        res.send({
          message: `Usluga sa id=${id} nije pronađena.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Greška prilikom brisanja vesti sa id=${id}.`
      });
    });
};

