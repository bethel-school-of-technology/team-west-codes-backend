'use strict';
module.exports = (sequelize, DataTypes) => {
  var favorites = sequelize.define(
    'favorites',
    {
      FavId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      Recip_ID: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.INTEGER
      },
      User_ID: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.INTEGER
      },
      Tried: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      Loved_it: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {}
  );

  return favorites;
};