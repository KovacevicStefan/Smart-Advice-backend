module.exports = (sequelize, Sequelize) => {
  const News = sequelize.define("news", {
    naslov: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    tekst: {
      type: Sequelize.STRING(2000),
      allowNull: false
    },
    autorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    datum: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    timestamps: false,
  });

  return News;
};
