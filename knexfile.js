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
