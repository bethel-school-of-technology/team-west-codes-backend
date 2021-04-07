'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 * createTable "recipes", deps: [users]
 * createTable "favorites", deps: [recipes, users]
 *
 **/

var info = {
    "revision": 1,
    "name": "initial",
    "created": "2021-04-06T22:14:50.454Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "users",
            {
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "FirstName": {
                    "type": Sequelize.STRING(50),
                    "field": "FirstName",
                    "allowNull": false
                },
                "LastName": {
                    "type": Sequelize.STRING(50),
                    "field": "LastName",
                    "allowNull": false
                },
                "Email": {
                    "type": Sequelize.STRING(50),
                    "field": "Email",
                    "unique": true,
                    "allowNull": false
                },
                "Username": {
                    "type": Sequelize.STRING(50),
                    "field": "Username",
                    "unique": true,
                    "allowNull": false
                },
                "Admin": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Admin",
                    "defaultValue": false,
                    "allowNull": false
                },
                "Password": {
                    "type": Sequelize.STRING(100),
                    "field": "Password"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt"
                },
                "Avitar": {
                    "type": Sequelize.BLOB,
                    "field": "Avitar"
                },
                "Deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Deleted",
                    "defaultValue": false,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "recipes",
            {
                "RecipeId": {
                    "type": Sequelize.INTEGER,
                    "field": "RecipeId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "field": "UserId",
                    "references": {
                        "model": "users",
                        "key": "UserId"
                    },
                    "allowNull": false
                },
                "Title": {
                    "type": Sequelize.STRING(100),
                    "field": "Title",
                    "allowNull": false
                },
                "Rating": {
                    "type": Sequelize.STRING(50),
                    "field": "Rating",
                    "allowNull": true
                },
                "Image": {
                    "type": Sequelize.BLOB,
                    "field": "Image"
                },
                "Ingredients": {
                    "type": Sequelize.TEXT,
                    "field": "Ingredients",
                    "allowNull": false
                },
                "Steps": {
                    "type": Sequelize.TEXT,
                    "field": "Steps",
                    "allowNull": false
                },
                "Serving_Size": {
                    "type": Sequelize.STRING(50),
                    "field": "Serving_Size"
                },
                "Prep_time": {
                    "type": Sequelize.STRING(50),
                    "field": "Prep_time"
                },
                "Total_Time": {
                    "type": Sequelize.STRING(50),
                    "field": "Total_Time"
                },
                "Nutrition": {
                    "type": Sequelize.TEXT,
                    "field": "Nutrition",
                    "allowNull": true
                },
                "Category": {
                    "type": Sequelize.STRING(100),
                    "field": "Category",
                    "allowNull": true
                },
                "Public": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Public",
                    "defaultValue": false,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "favorites",
            {
                "FavId": {
                    "type": Sequelize.INTEGER,
                    "field": "FavId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "RecipeId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "field": "RecipeId",
                    "references": {
                        "model": "recipes",
                        "key": "RecipeId"
                    },
                    "foreignKey": true,
                    "allowNull": false
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "field": "UserId",
                    "references": {
                        "model": "users",
                        "key": "UserId"
                    },
                    "foreignKey": true,
                    "allowNull": false
                },
                "Tried": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Tried",
                    "defaultValue": false,
                    "allowNull": true
                },
                "Loved_it": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Loved_it",
                    "defaultValue": false,
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
