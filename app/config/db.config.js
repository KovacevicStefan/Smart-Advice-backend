module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "password",
  DB: "smartadvice",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

/*
module.exports = {
  HOST: "127.0.0.1",
  USER: "smartadv_root",
  PASSWORD: "password",
  DB: "smartadv_database",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}; */
