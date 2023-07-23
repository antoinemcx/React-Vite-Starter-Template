function generateUserID(length) {
    const values = '0123456789';
    let id = '';
    for (let _length = 0; _length < length; _length++) id += values[Math.floor(Math.random() * values.length)];

    global.db.query(`SELECT * FROM users WHERE id = "${id}"`).then(rows => { if(rows[0] !== undefined) { generateID(15) } })
    return id;
};

module.exports = { generateUserID };