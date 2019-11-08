const usermodels = require("../models/usermodel");
const cropmodels = require("../models/cropmodel");
// const jwt = require("jsonwebtoken");

module.exports = {
  signup: async function (req, res) {
    try {
      let userSignup = await usermodels.signup(req.body);
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

      // session
      if (equality) {
        var sess = req.session;
        sess.email = signinData.email;
        res.sendStatus(200);
      } else {
        res.sendStatus(500);
      }

      // // jwt trial
      // if (equality) {
      //   jwt.sign({ signinData }, "secretkey", { expiresIn: "1h" }, (err, token) => {
      //     return new Promise((resolve, reject) => {
      //       if (err) {
      //         return reject(err);
      //       }
      //       else {
      //         return resolve(token);
      //       }
      //     }).then(data => {
      //       res.cookie("token", data, { httpOnly: true })
      //       res.sendStatus(200);
      //     }).catch(err => {
      //       if (err) {
      //         res.sendStatus(500);
      //       }
      //     })
      //   })
      // }
    } catch (err) {
      res.sendStatus(500);
    }
  },
  signout: function (req, res) {
    // session
    var sess = req.session;
    if (sess.email) {
      req.session.destroy(function (err) {
        if (err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    } else {
      res.sendStatus(500);
    }

    // // jwt trial
    // jwt.verify(req.token, "secretkey", (err, authData) => {
    //   if (err) {
    //     res.sendStatus(500);
    //   } else {
    //     let userEmail = authData.email;
    //     res.json({ userEmail }); // logout하는 유저의 데이터 (위의 signinData)
    //   }
    // });
  },
  reco: async function (req, res) {
    let recoCrops = await cropmodels.reco(req.session.email);
    if (recoCrops) {
      res.status(200);
      res.send(JSON.stringify(recoCrops));
    } else {
      res.sendStatus(500);
    }
  },
  temp: async function (req, res) {
    const email = req.session.email;
    const { temp } = req.params;
    console.log("re", temp);
    try {
      let recoCrops = await cropmodels.reco(email);
      let trafficLight = await cropmodels.level(recoCrops[48]["mintemp"], recoCrops[48]["maxtemp"], temp)
      res.status(200)
      res.send(JSON.stringify(trafficLight));
    }
    catch (err) {
      res.sendStatus(500);
    }
  },
  search: async function (req, res) {
    const { cropName } = req.params;
    console.log(cropName);
    try {
      const cropInfo = await cropmodels.search(cropName);
      res.status(200);
      res.send(JSON.stringify(cropInfo))
    } catch{
      res.sendStatus(500);
    }
  }
};
