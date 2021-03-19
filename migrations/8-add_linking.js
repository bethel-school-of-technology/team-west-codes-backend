'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "user_recs", deps: [users, recipes]
 *
 **/

var info = {
    "revision": 8,
    "name": "add_linking",
    "created": "2021-03-12T20:11:02.787Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "user_recs",
        {
            "Id": {
                "type": Sequelize.INTEGER,
                "field": "Id",
                "primaryKey": true,
                "autoIncrement": true,
                "allowNull": false
            },
            "UserId": {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "users",
                    "key": "UserId"
                },
                "unique": "user_recs_RecipeId_UserId_unique",
                "field": "UserId",
                "primaryKey": true,
                "allowNull": false
            },
            "RecipeId": {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "recipes",
                    "key": "RecipeId"
                },
                "unique": "user_recs_RecipeId_UserId_unique",
                "field": "RecipeId",
                "primaryKey": true,
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
}];

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
