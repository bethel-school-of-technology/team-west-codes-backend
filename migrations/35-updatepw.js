'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "Password" on table "users"
 *
 **/

var info = {
    "revision": 35,
    "name": "updatepw",
    "created": "2021-03-23T06:54:14.116Z",
    "comment": ""
};

var migrationCommands = [
    {
        fn: "changeColumn",
        params: [
            "users",
            "Password",
            {
                "type": Sequelize.STRING(100),
                "field": "Password"
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
