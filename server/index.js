// Express
var express = require("express");

// Middleware
var morgan = require("morgan");
var parser = require("body-parser");
var cors = require("cors");
var session = require("express-session");

// Router
var userrouter = require("./userroutes.js");
var croprouter = require("./croproutes.js");

// Execution
var app = express();
module.exports.app = app;

app.set("port", 5000);

// Cors
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

// use session
app.use(
  session({
    secret: "secretkey",
    resave: true,
    saveUninitialized: true,
    maxAge: 20000
  })
);

// Logging and parsing
app.use(morgan("dev"));
app.use(parser.json());

// Set up our routes
app.use("/user", userrouter);
app.use("/crop", croprouter);

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}
