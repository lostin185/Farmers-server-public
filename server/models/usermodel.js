const db = require("../db/models").sequelize;
const { User } = require("../db/models");

// const user = require("../db/models/index").user;

User.sync()
  .create({
    username: "김태중",
    password: "12311",
    email: "taej12@gmail.com",
    location: "충청남도"
  })
  .then(result => {
    console.log("result: ", result.id);
  });
