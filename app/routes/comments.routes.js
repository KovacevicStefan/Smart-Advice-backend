module.exports = app => {
    const commentsController = require("../controllers/comments.controller");

    var router = require("express").Router();
  
    router.get("/comments/:newsId", commentsController.getByNewsId);

    router.post('/comments', commentsController.addComment);

    router.get('/comments/commentId/:id', commentsController.getCommentById);

    router.put('/comments/commentId/:id', commentsController.updateComment);

    router.delete("/comments/commentId/:id", commentsController.deleteComment);

    app.use('/api', router);
  };
  