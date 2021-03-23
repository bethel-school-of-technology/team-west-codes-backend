'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "Recip_ID" from table "favorites"
 * removeColumn "User_ID" from table "favorites"
 * addColumn "RecipeId" to table "favorites"
 * addColumn "UserId" to table "favorites"
 * changeColumn "UserId" on table "recipes"
 * changeColumn "UserId" on table "recipes"
 * changeColumn "UserId" on table "recipes"
 *
 **/

var info = {
    "revision": 34,
    "name": "morelinks",
    "created": "2021-03-20T05:37:25.694Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["favorites", "Recip_ID"]
    },
    {
        fn: "removeColumn",
        params: ["favorites", "User_ID"]
    },
    {
        fn: "addColumn",
        params: [
            "favorites",
            "RecipeId",
            {
                "type": Sequelize.INTEGER,
                "field": "RecipeId",
                "foreignKey": true,
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "favorites",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "field": "UserId",
                "foreignKey": true,
                "allowNull": false
            }
        ]
    },
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
