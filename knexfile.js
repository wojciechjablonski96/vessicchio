/*
 * Copyright (C) 2021 Wojciech Jablonski All rights reserved.
 *
 * This document is the property of Wojciech Jablonski <info@wojciechjablonski.com>.
 * It is considered confidential and proprietary.
 *
 * This document may not be reproduced or transmitted in any form,
 * in whole or in part, without the express written permission of
 * Wojciech Jablonski <info@wojciechjablonski.com>.
 */

const dotenv = require("dotenv");
dotenv.config();

module.exports = {

    development: {
        client: 'mysql2',
        connection: {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_DB,
            database: process.env.MYSQL_PASSWORD
        },
        migrations: {
            tableName: 'migrations'
        }
    },

    staging: {
        client: 'mysql2',
        connection: {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_DB,
            database: process.env.MYSQL_PASSWORD
        },
        migrations: {
            tableName: 'migrations'
        }
    },

    production: {
        client: 'mysql2',
        connection: {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_DB,
            database: process.env.MYSQL_PASSWORD
        },
        migrations: {
            tableName: 'migrations'
        }
    }

};
