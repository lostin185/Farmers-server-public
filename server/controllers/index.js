const usermodels = require("../models/usermodel");
const cropmodels = require("../models/cropmodel");
const jwt = require("jsonwebtoken");

//jwt 토큰 가져오기
module.exports = {
  signup: async function (req, res) {
    console.log("req.body", req.body)
    try {
      let userSignup = await usermodels.signup(req.body);
      console.log(
        "userSignup", userSignup
      )
      if (userSignup === "success") {
        res.status(201);
        res.send({ success: true });
      } else if (userSignup === "fail") {
        res.status(201);
        res.send(JSON.stringify({ success: false }));
      }
    } catch (err) {
      res.sendStatus(500);
    }
  },
  signin: async function (req, res) {
    try {
      let signinData = {
        email: req.body.email,
        password: req.body.password
      };
      let equality = await usermodels.signin(signinData);
      if (equality) {
        jwt.sign({ signinData }, "secretkey", { expiresIn: "30s" }, (err, token) => {
          return new Promise((resolve, reject) => {
            if (err) {
              return reject(err);
            }
            else {
              return resolve(token);
            }
          }).then(data => {
            // setCookie('token', data, 1);
            console.log("data::::", data)
            res.cookie("token", data)
            console.log("make cookie!");
            res.sendStatus(200);
          }).catch(err => {
            if (err) {
              res.sendStatus(500);
            }
          })
        })
      }
    } catch (err) {
      res.sendStatus(500);
    }
  },
  signout: function (req, res) {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        res.sendStatus(500);
      } else {
        let userEmail = authData.email;
        res.json({ userEmail }); // logout하는 유저의 데이터 (위의 signinData)
      }
    });
  },
  reco: async function (req, res) {
    //request요청 header에 들어있는 토큰을 가져오기
    let recoCrops = await cropmodels.reco("swerty14@naver.com");
    if (recoCrops) {
      console.log("추천작물 성공");
      res.status(200);
      res.send(JSON.stringify(recoCrops));
    } else {
      res.sendStatus(500);
    }
  }
}