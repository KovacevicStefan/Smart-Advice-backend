module.exports = (sequelize, Sequelize) => {
  const Email = sequelize.define("email", {
    imePrezime: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    naslov: {
      type: Sequelize.STRING
    },
    poruka: {
      type: Sequelize.STRING
    },
    datumVreme: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    timestamps: false,
  });

  return Email;
};
