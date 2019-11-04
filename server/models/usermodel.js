const user = require("../db/models/index").User;

user.sync();

module.exports = {
  signup: function(data) {
    const {
      email,
      password,
      username,
      location,
      category,
      term,
      difficulty,
      labor
    } = data;
    console.log(data);
    return new Promise((resolve, reject) => {
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
        .then(() => {
          return resolve("ok");
        })
        .catch(err => {
          console.log(err);
          return reject(err);
        });
    });
  },
  signin: function(userinfo) {
    return new Promise((resolve, reject) => {
      user
        .findOne({
          where: {
            email: userinfo.email,
            password: userinfo.password
          }
        })
        // .then(data => data[0].dataValues);
        .then(data => {
          if (data) {
            return resolve(true);
          } else {
            return reject(false);
          }
        });
    });
  }
};
