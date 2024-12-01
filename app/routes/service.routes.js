module.exports = app => {
    const serviceController = require("../controllers/service.controller");
    const verifyToken = require("../config/jwt.config");
    
    var router = require("express").Router();
  
    router.get("/services", serviceController.getAll);

    router.get("/services/:id", serviceController.getOne);

    router.post("/services", verifyToken, serviceController.addService);

    router.put("/services/:id", verifyToken, serviceController.updateService);

    router.delete("/services/:id", verifyToken, serviceController.deleteService);
  
    app.use('/api', router);
}
