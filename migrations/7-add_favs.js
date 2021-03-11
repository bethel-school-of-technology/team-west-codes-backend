'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "favorites", deps: []
 *
 **/

var info = {
    "revision": 7,
    "name": "add_favs",
    "created": "2021-03-08T07:04:22.529Z",
    "comment": ""
};

var migrationCommands = [{
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
            "Recip_ID": {
                "type": Sequelize.INTEGER,
                "field": "Recip_ID",
                "foreignKey": true,
                "allowNull": false
            },
            "User_ID": {
                "type": Sequelize.INTEGER,
                "field": "User_ID",
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
