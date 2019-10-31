var controller = require("./controllers");
var router = require("express").Router();
var cors = require("cors");

router.use(cors());

//Connect controller methods to their corresponding routes
router.get("/signup", controller.signup);

router.post("/signin", controller.signin);

router.get("/signout", controller.signout);

module.exports = router;
