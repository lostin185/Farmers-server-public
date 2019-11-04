var express = require("express");

// Middleware
var morgan = require("morgan");
var parser = require("body-parser");

// Router
var userrouter = require("./userroutes.js");
// var croprouter = require("./croproutes.js");
const cors = require("cors");
var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set("port", 3000);

// Logging and parsing
app.use(morgan("dev"));
app.use(parser.json());

// Set up our routes
app.use("/user", userrouter);
// app.use("/crop", croprouter);

// Serve the client files
// app.use(express.static(__dirname + "/../client"));

// handling options
app.use(cors());

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}
