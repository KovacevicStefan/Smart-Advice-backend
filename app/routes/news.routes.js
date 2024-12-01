module.exports = app => {
    const newsController = require("../controllers/news.controller");
    const verifyToken = require("../config/jwt.config");

    var router = require("express").Router();
  
    router.get("/news", newsController.getAll);
  
    router.get("/news/:id", newsController.getOne);
  
    router.get('/news/naslov/:naslov', newsController.getByNaslov);

    router.get('/news/author/:userId', newsController.getByUserId);

    router.post("/news", verifyToken, newsController.addNews);
  
    router.put("/news/:id", verifyToken, newsController.updateNews);
  
    router.delete("/news/:id", verifyToken, newsController.delete);
  
    app.use('/api', router);
  };
  