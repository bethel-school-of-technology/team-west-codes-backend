'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define(
    'users',
    {
      UserId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      FirstName: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      LastName: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      Email: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
      },
      Username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      Admin: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      Password: DataTypes.STRING(50),
      createdAt: DataTypes.DATE,
      Avitar: DataTypes.BLOB,
      Deleted: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {}
  );

  return users;
};