const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Ucitavanje modela
db.news = require("./news.model.js")(sequelize, Sequelize);
db.email = require("./email.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.service = require("./service.model.js")(sequelize, Sequelize);
db.comments = require("./comments.model.js")(sequelize, Sequelize);

// Asocijacije
db.user.hasMany(db.news, { foreignKey: 'autorId', as: 'news'});
db.news.belongsTo(db.user, { foreignKey: 'autorId', as: 'autor'});
db.comments.belongsTo(db.news, { foreignKey: 'newsId', as: 'news'});
db.comments.hasMany(db.comments, { foreignKey: 'replyTo', as: 'parentId' });

module.exports = db;
