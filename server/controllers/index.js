const user = require("../db/models/index").User;
//jwt 토큰 가져오기
user.sync();
module.exports = {
  singup: function(req, res) {
    const {
      email,
      password,
      username,
      location,
      category,
      term,
      difficulty,
      labor
    } = req.body;
    user
      .create({
        username,
        password,
        email,
        location,
        category,
        term,
        difficulty,
        labor
      })
      .then(data => {
        console.log("들어갔다", data);
        res.sendStatus(200);
      });
  },
  signin: function(req, res) {
    //로그인 ....
  },
  signout: function(req, res) {}
};
