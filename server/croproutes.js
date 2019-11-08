var controller = require("./controllers");
var router = require("express").Router();

//Connect controller methods to their corresponding routes
router.get("/reco", controller.reco); // email, password, username, location 필수
router.get("/:temp", controller.temp);
module.exports = router;
