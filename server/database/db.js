const mariadb = require('mariadb');
require('dotenv').config()

const db = mariadb.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 5
})

db.getConnection()
.then(() => console.log("\x1b[32m%s\x1b[0m", `MariaDB is successfully connected on '${process.env.DB_DATABASE}'`))
.catch(err => { console.log(err) });

module.exports = db;