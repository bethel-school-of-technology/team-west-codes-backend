'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "Serving_Size" to table "recipes"
 * addColumn "Prep_time" to table "recipes"
 * addColumn "Total_Time" to table "recipes"
 *
 **/

var info = {
    "revision": 6,
    "name": "add_rec",
    "created": "2021-03-08T06:54:10.664Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "recipes",
            "Serving_Size",
            {
                "type": Sequelize.STRING(50),
                "field": "Serving_Size"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "recipes",
            "Prep_time",
            {
                "type": Sequelize.STRING(50),
                "field": "Prep_time"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "recipes",
            "Total_Time",
            {
                "type": Sequelize.STRING(50),
                "field": "Total_Time"
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
