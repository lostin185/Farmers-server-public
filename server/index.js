// Express
const express = require("express");

// Middleware
const morgan = require("morgan");
const parser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

// Router
const userRouter = require("./userroutes.js");
const cropRouter = require("./croproutes.js");
const searchRouter = require("./searchroutes.js");

// Execution
const app = express();
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

// no etag - when dynamic
app.set("etag", false);

// no etag - when static
const options = { etag: false };
app.use(express.static("public", options));

// Set up our routes
app.use("/user", userRouter);
app.use("/crop", cropRouter);
app.use("/search", searchRouter);

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}
