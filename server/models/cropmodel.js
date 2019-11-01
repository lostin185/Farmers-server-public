const crop = require("../db/models/index").Crop;
const user = require("../db/models/index").User;

crop.sync();
user.sync();

module.exports = {
  reco: function(userEmail) {
    user
      .findOne({
        where: { email: userEmail }
      })
      .then(data => {
        var UserLocation = data.dataValues.location;
        crop
          .findAll({
            where: { location: UserLocation }
          })
          .then(data => {
            let reuslt = [];
            for (let i in data) {
              reuslt.push(data[i].dataValues);
            }
            return reuslt;
          });
      })
      .catch(err => console.log(err));
  }
};
