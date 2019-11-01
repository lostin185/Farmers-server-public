const models = require("../models/usermodel");
const jwt = require("jsonwebtoken");

module.exports = {
  signup: async function(req, res) {
    try {
      await models.signup(req.body);
      res.redirect(req.originalUrl /*+ login url*/).sendStatus(201);
    } catch (err) {
      res.sendStatus(500);
    }
  },

  signin: async function(req, res) {
    try {
      let signinData = {
        email: req.body.email,
        password: req.body.password
      };

      let equality = await models.signin(signinData);

      if (equality) {
        jwt.sign(signinData, "secretkey", { expiresIn: "1h" }, (err, token) => {
          res.status(200).json({ token });
        });
      }
    } catch (err) {
      res.sendStatus(500);
    }

    // let signinData = {
    //   email: req.body.email,
    //   password: req.body.password
    // };

    // let equality = await models.signin(signinData);

    // if (equality) {
    //   jwt.sign(signinData, "secretkey", { expiresIn: "1h" }, (err, token) => {
    //     res.status(200).json({ token });
    //   });
    // } else {
    //   res.status(404).send("no matching email and password");
    // }
  },

  signout: function(req, res) {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        res.sendStatus(500);
      } else {
        let userEmail = authData.email;
        res.json({ userEmail }); // logout하는 유저의 데이터 (위의 signinData)
      }
    });
  }
};
