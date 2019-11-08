var controller = require("./controllers");
var router = require("express").Router();

//Connect controller methods to their corresponding routes
router.get("/:cropName", controller.search);

module.exports = router;
