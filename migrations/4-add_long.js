'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "Ingredients" to table "recipes"
 *
 **/

var info = {
    "revision": 4,
    "name": "add_long",
    "created": "2021-03-08T06:51:17.686Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "recipes",
        "Ingredients",
        {
            "type": Sequelize.TEXT,
            "field": "Ingredients",
            "allowNull": false
        }
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
