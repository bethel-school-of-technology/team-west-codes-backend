'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_rec = sequelize.define(
    'user_rec',
    {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      UserId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      RecipeId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
      }
    },
    {}
  );

  return user_rec;
};