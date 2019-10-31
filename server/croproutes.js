var controller = require("./controllers");
var router = require("express").Router();
var cors = require("cors");

router.use(cors());

//Connect controller methods to their corresponding routes
router.get("/reco", controller.reco);

module.exports = router;
