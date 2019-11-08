const crop = require("../db/models/index").Crop;
const user = require("../db/models/index").User;

crop.sync();
user.sync();

module.exports = {
  reco: async function (userEmail) {
    return user
      .findOne({
        attributes: ["location", "category", "term", "difficulty", "labor"],
        where: { email: userEmail }
      })
      .then(data => {
        const { location, category, term, difficulty, labor } = data.dataValues;
        return crop
          .findAll({
            where:
            {
              location,
              category,
              term,
              difficulty,
              labor
            }
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
  },
  search: function (cropName) {
    return new Promise((resolve, reject) => {
      crop.findOne({
        where: { cropname: cropName }
      }).then(data => {
        return resolve(data.dataValues);
      }).catch(err => {
        return reject(err);
      })
    })
  }
}
