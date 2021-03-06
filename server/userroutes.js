var controller = require("./controllers");
var router = require("express").Router();

// // jwt trial
// function verifyToken(req, res, next) {
//   // Get auth header value
//   const bearerHeader = req.headers["authorization"];
//   // Check if bearer is undefined
//   if (typeof bearerHeader !== "undefined") {
//     // Split at the space
//     const bearer = bearerHeader.split(" ");
//     // Get token form array
//     const bearerToken = bearer[1];
//     // Set the token
//     req.token = bearerToken;
//     // Next middleware
//     next();
//   } else {
//     // Forbidden
//     res.sendStatus(500);
//   }
// }

//Connect controller methods to their corresponding routes
router.post("/signup", controller.signup); // email, password, username, location 필수

router.post("/signin", controller.signin);

// router.post("/signout", verifyToken, controller.signout);
router.post("/signout", controller.signout);

module.exports = router;
