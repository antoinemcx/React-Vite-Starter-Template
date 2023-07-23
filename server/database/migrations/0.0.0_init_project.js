// Run 'node database/migrations/<file>.js' to migrate on the database
const db = require('../db');

db.query(`
    CREATE TABLE IF NOT EXISTS users (
        id varchar(100) NOT NULL PRIMARY KEY,
        username varchar(50) NOT NULL,
        email varchar(75) DEFAULT NULL,
        password varchar(200) NOT NULL,
        roles varchar(150) DEFAULT 'user',
        refreshToken text DEFAULT NULL,
        createdAt date NOT NULL DEFAULT current_timestamp()
    );
`, (err) => {
    if(err) {
        console.error("\x1b[31m%s\x1b[0m", `\n[!] Error creating the users table : ${err.message}`);
        return db.end();
    }
}).then(() => {
    console.log("\x1b[32m%s\x1b[0m", `\n(!) "users" table created`);
    db.end();
    return process.exit();
})