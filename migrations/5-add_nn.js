'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "Nutrition" to table "recipes"
 * addColumn "Steps" to table "recipes"
 *
 **/

var info = {
    "revision": 5,
    "name": "add_nn",
    "created": "2021-03-08T06:53:26.241Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "recipes",
            "Nutrition",
            {
                "type": Sequelize.TEXT,
                "field": "Nutrition",
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "recipes",
            "Steps",
            {
                "type": Sequelize.TEXT,
                "field": "Steps",
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
