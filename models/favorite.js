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
      RecipeId: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'recipes',
          key: 'RecipeId',
        }
      },
      UserId: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'UserId',
        }
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