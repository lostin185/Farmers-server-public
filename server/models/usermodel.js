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
    return new Promise((resolve, reject) => {
      user
        .create({
          username,
          password,
          email,
          location
        })
        .then(data => {
          return resolve("ok");
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
  signin: function() {
    return user.findAll().then(data => data[0].dataValues);
  }
};
