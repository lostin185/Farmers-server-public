const crop = require("../db/models/index").Crop;
const user = require("../db/models/index").User;

crop.sync();
user.sync();

module.exports = {
  reco: async function(userEmail) {
    return user
      .findOne({
        where: { email: userEmail }
      })
      .then(data => {
        var UserLocation = data.dataValues.location;
        return crop
          .findAll({
            where: { location: UserLocation }
          })
          .then(data => {
            let result = [];
            for (let i in data) {
              result.push(data[i].dataValues);
            }
            return result;
          });
      })
      .catch(err => console.log(err));
  }
};
