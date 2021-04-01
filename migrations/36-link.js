'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "recipeRecipeId" to table "favorites"
 * addColumn "userUserId" to table "favorites"
 * changeColumn "UserId" on table "favorites"
 * changeColumn "RecipeId" on table "favorites"
 *
 **/

var info = {
    "revision": 36,
    "name": "link",
    "created": "2021-03-25T00:30:20.497Z",
    "comment": ""
};

var migrationCommands = [
    
    {
        fn: "changeColumn",
        params: [
            "favorites",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "field": "UserId",
                "references": {
                    "model": "users",
                    "key": "UserId"
                },
                "foreignKey": true,
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "favorites",
            "RecipeId",
            {
                "type": Sequelize.INTEGER,
                "field": "RecipeId",
                "references": {
                    "model": "recipes",
                    "key": "RecipeId"
                },
                "foreignKey": true,
                "allowNull": false
            }
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
