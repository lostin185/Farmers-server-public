module.exports = function(sequelize, DataTypes) {
  let user = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
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
      }
    },
    {}
  );
  return user;
};
