'use strict';
module.exports = (sequelize, DataTypes) => {
  var recipes = sequelize.define(
    'recipes',
    {
      RecipeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'UserId',
        }
      },/**/
      Title: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      Rating: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      Image: DataTypes.BLOB,
     Ingredients: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      Steps: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      Serving_Size: DataTypes.STRING(50),
      Prep_time: DataTypes.STRING(50),
      Total_Time: DataTypes.STRING(50),
      Nutrition: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      Category: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      Public: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {}
  );

  return recipes;
};