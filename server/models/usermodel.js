const user = require("../db/models/index").User;

user.sync();

module.exports = {
  signup: function(data) {
    const { email, password, username, location, category, term, difficulty, labor } = data;
    return new Promise((resolve, reject) => {
      user
        .findOrCreate({
          where: { email: email },
          defaults: {
            email,
            password,
            username,
            location,
            category,
            term,
            difficulty,
            labor
          }
        })
        .spread((memo, created) => {
          if (created) {
            return resolve("success");
          } else {
            return resolve("fail");
          }
        })
        .catch(err => {
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
