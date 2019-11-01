const models = require("../models/usermodel");
//jwt 토큰 가져오기
module.exports = {
  signup: async function (req, res) {
    try {
      await models.signup(req.body);
      res.sendStatus(201);
      //redirect(홈페이지로...)
    } catch (err) {
      res.sendStatus(500)
    }
  },
  signin: async function (req, res) {
    let result = await models.signin();
  },
  signout: function (req, res) {
    //destory();
    //로그아웃
  },
  reco: function (req, res) {
    //추천 작물 가져오기
  }
};
