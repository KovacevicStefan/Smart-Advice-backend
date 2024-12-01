module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define("service", {
      text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slika: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    }, {
      timestamps: false,
    });
  
    return Service;
  };
  