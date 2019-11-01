module.exports = function(sequelize, DataTypes) {
  let crop = sequelize.define(
    "Crop",
    {
      cropname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true
      },
      maxtemp: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      mintemp: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      maxph: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      minph: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      term: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      difficulty: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      labor: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      method: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    (crop.associate = function(modles) {
      crop.belongsToMany(modles.user, { through: "user_crop" });
    })
  );
  return crop;
};
