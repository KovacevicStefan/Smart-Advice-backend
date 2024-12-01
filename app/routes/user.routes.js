module.exports = app => {
  const userConfig = require("../controllers/user.controller");

  var router = require("express").Router();

  router.post('/login', userConfig.loginUser);

  router.put('/user/updatePassword', userConfig.updatePassword);

  app.use('/api', router);
};
