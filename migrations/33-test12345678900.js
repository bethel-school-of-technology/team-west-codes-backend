'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "userUseId" from table "recipes"
 * removeColumn "UseId" from table "recipes"
 * removeColumn "UseId" from table "users"
 * addColumn "UserId" to table "users"
 * addColumn "userUserId" to table "recipes"
 * addColumn "UserId" to table "recipes"
 *
 **/

var info = {
    "revision": 33,
    "name": "test12345678900",
    "created": "2021-03-19T21:44:42.985Z",
    "comment": ""
};

var migrationCommands = [
    
    {
        fn: "removeColumn",
        params: ["recipes", "userUserId"]
    },

    /*{
        fn: "addColumn",
        params: [
            "recipes",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "field": "UserId",
                "references": {
                    "model": "users",
                    "key": "UserId"
                },
                "allowNull": false
            }
        ]
    }*/
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
