const Uermodels = require("../models/usermodel");
const cropmodels = require("../models/cropmodel");
//jwt 토큰 가져오기
module.exports = {
  signup: async function (req, res) {
    try {
      await Uermodels.signup(req.body);
      res.sendStatus(201);
      //redirect(홈페이지로...)
    } catch (err) {
      res.sendStatus(500)
    }
  },
  signin: async function (req, res) {
    let result = await Uermodels.signin();
  },
  signout: function (req, res) {
    //destory();
    //로그아웃
  },
  reco: async function (req, res) {
    let recoCrops = await cropmodels.reco("fdfs");
    console.log("reco", recoCrops);
  }
};
