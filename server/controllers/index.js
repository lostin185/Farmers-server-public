const usermodels = require("../models/usermodel");
const cropmodels = require("../models/cropmodel");
const jwt = require("jsonwebtoken");

//jwt 토큰 가져오기
module.exports = {
  signup: async function(req, res) {
    try {
      await usermodels.signup(req.body);
      res.sendStatus(201).redirect(req.originalUrl /*+ login url*/);
      //redirect(홈페이지로...)
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

      let equality = await usermodels.signin(signinData);

      if (equality) {
        jwt.sign(signinData, "secretkey", { expiresIn: "1h" }, (err, token) => {
          res.status(200).json({ token });
        });
      }
    } catch (err) {
      res.sendStatus(500);
    }
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
  },
  reco: async function(req, res) {
    let recoCrops = await cropmodels.reco("sop11@email.com");
    console.log("결과: ", recoCrops);
    res.sendStatus(200);
  }
};
