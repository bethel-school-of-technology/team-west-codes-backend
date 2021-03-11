'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "initial_migration",
    "created": "2021-03-08T05:46:51.748Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "users",
        {
            "UserId": {
                "type": Sequelize.INTEGER,
                "field": "UserId",
                "primaryKey": true,
                "autoIncrement": true,
                "allowNull": false
            },
            "FirstName": {
                "type": Sequelize.STRING(50),
                "field": "FirstName",
                "allowNull": false
            },
            "LastName": {
                "type": Sequelize.STRING(50),
                "field": "LastName",
                "allowNull": false
            },
            "Email": {
                "type": Sequelize.STRING(50),
                "field": "Email",
                "unique": true,
                "allowNull": false
            },
            "Username": {
                "type": Sequelize.STRING(50),
                "field": "Username",
                "unique": true,
                "allowNull": false
            },
            "Admin": {
                "type": Sequelize.BOOLEAN,
                "field": "Admin",
                "defaultValue": false,
                "allowNull": false
            },
            "Password": {
                "type": Sequelize.STRING(50),
                "field": "Password"
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt"
            },
            "Avitar": {
                "type": Sequelize.BLOB,
                "field": "Avitar"
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
