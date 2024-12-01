const { where } = require("sequelize");
const db = require("../models");
const Comments = db.comments;

exports.getByNewsId = (req, res) => {
    const newsId = req.params.newsId;
  
    Comments.findAll({
      where: { newsId: newsId },
      attributes: { exclude: ['commentId'] }
    })
      .then(data => {
        if (data.length > 0) {
          res.send(data);
        } else {
          res.status(200).send([]);
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({
          message: `Greška prilikom dohvatanja komentara za vest sa ID-jem '${newsId}'.`
        });
      });
  };

exports.getCommentById = (req, res) => {
  const commentId = req.params.id;

  Comments.findByPk(commentId)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Komentar sa ID-jem '${commentId}' nije pronađen.`
        });
      }
    })
    .catch(err => {
      // U slučaju greške u upitu, vrati status 500 i grešku
      console.error(err);
      res.status(500).send({
        message: `Greška prilikom dohvatanja komentara sa ID-jem '${commentId}'.`
      });
    });
};

exports.addComment = (req, res) => {
  const comment = {
    imePrezime: req.body.imePrezime,
    text: req.body.text,
    newsId: req.body.newsId,
    replyTo: req.body.replyTo || null,
    plus: req.body.plus || 0,
    minus: req.body.minus || 0,
    dateTime: req.body.dateTime || new Date()
  };

  Comments.create(comment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: "Došlo je do greške prilikom dodavanja komentara"
      });
    });
};

exports.updateComment = (req, res) => {
  const id = req.params.id;

  Comments.findByPk(id)
    .then(data => {
      if (data) {
        const updatedComment = {
          imePrezime: req.body.imePrezime,
          text: req.body.text,
          newsId: req.body.newsId,
          replyTo: req.body.replyTo || null,
          plus: req.body.plus || 0,
          minus: req.body.minus || 0,
          dateTime: req.body.dateTime || new Date()
        };

        Comments.update(updatedComment, {
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Komentar je uspešno ažuriran."
              });
            } else {
              res.status(404).send({
                message: `Komentar sa id=${id} nije pronađen ili nema promena.`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: `Greška prilikom ažuriranja komentara sa id=${id}.`
            });
          });

      } else {
        res.status(404).send({
          message: `Komentar sa ID-jem '${id}' nije pronađen.`
        });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: `Greška prilikom dohvatanja komentara sa ID-jem '${id}'.`
      });
    });
};

exports.deleteComment = (req, res) => {
  const id = req.params.id;

  Comments.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Komentar je uspešno obrisan."
        });
      } else {
        res.send({
          message: `Komentar sa id=${id} nije pronađen.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Greška prilikom brisanja komenatara sa id=${id}.`
      });
    });
};
