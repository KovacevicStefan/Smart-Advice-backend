module.exports = app => {
    const emailController = require("../controllers/email.controller");
    const verifyToken = require("../config/jwt.config");

    var router = require("express").Router();
  
    router.get("/email", verifyToken, emailController.getAll);
  
    router.get("/email/:id", verifyToken, emailController.getOne);
  
    router.post("/email", emailController.sendEmail);
  
    router.delete("/email/:id", verifyToken, emailController.delete);
  
    app.use('/api', router);
  };
  