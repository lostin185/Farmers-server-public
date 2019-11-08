const crop = require("../db/models/index").Crop;
const user = require("../db/models/index").User;

crop.sync();
user.sync();
module.exports = {
  reco: async function (userEmail) {
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
  },
  level: function (minTemp, maxTemp, temp) {
    let trafficLight = { level: 0 }
    return new Promise((resolve, reject) => {
      if (minTemp - 3 < temp && temp < maxTemp + 3) {
        trafficLight.level = 2;
        if (maxTemp < temp && temp < maxTemp) {
          trafficLight.level = 1;
        }
      }
      else {
        trafficLight.level = 3;
      }
      if (trafficLight.level > 0) {
        resolve(trafficLight);
      }
      else {
        reject(trafficLight);
      }
    })
  }
}