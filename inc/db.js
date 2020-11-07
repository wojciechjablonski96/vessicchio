var dbconnection = require('knex')({
    client: 'mysql2',
    connection: {
      host : process.env.MYSQL_HOST,
      user : process.env.MYSQL_USER,
      password : process.env.MYSQL_DB,
      database : process.env.MYSQL_PASSWORD
    },
    migrations: {
        tableName: 'migrations'
      }
  });

  module.exports = dbconnection;