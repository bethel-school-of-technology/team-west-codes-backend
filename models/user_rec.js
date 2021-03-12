'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define(
    'user_rec',
    {
      UserId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      RecipeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      }
    },
    {}
  );

  return user_rec;
};