/* Copyright (C) Wojciech Jablonski - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Wojciech Jablonski <info@wojciechjablonski.com>, 2021
 */

var database = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_DB,
        database: process.env.MYSQL_PASSWORD
    },
    migrations: {
        tableName: 'migrations'
    },
    pool: { min: 0, max: 7 }
});

module.exports = database;