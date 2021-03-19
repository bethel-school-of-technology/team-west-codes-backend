'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "recipes", deps: []
 *
 **/

var info = {
    "revision": 3,
    "name": "add_recipes",
    "created": "2021-03-08T06:48:48.559Z",
    "comment": ""
};

var migrationCommands = [{
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
