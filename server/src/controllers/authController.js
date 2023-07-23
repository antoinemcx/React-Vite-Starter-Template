require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateUserID } = require('../utils/functions');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ 'message': 'All the fields are required.' });

    const searchUsername = await global.db.query('SELECT id,username FROM users WHERE username = ?', [username]);
    const searchEmail = await global.db.query('SELECT id,email FROM users WHERE email = ?', [email]);

    if (searchUsername[0]) return res.status(409).json({ 'message': "This username is already taken." });
    if (searchEmail[0]) return res.status(409).json({ 'message': "This email is already taken." });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await global.db.query('INSERT INTO users (id,username,email,password) VALUES (?,?,?,?)', [generateUserID(15), username, email, hashedPassword]);

        res.status(201).json({ 'success': `New user ${username} created !` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};

const login = async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || !password) return res.status(400).json({ 'message': 'Username (or email) and password are required.' });

    const searchUser = await global.db.query('SELECT * FROM users WHERE username = ? or email = ?', [usernameOrEmail, usernameOrEmail]);
    if (!searchUser[0]) return res.status(401).json({ 'message': 'The username (or email) is invalid.' });

    const match = await bcrypt.compare(password, searchUser[0].password);
    if (match) {
        const roles = searchUser[0].roles.split(',');

        const accessToken = jwt.sign(
            {"user": {
                "username": searchUser[0].username,
                "roles": roles
            }},
            process.env.ACCESSTOKEN_SECRET,
            { expiresIn: '10s' }
        );
        const refreshToken = jwt.sign(
            { "username": searchUser[0].username },
            process.env.REFRESHTOKEN_SECRET,
            { expiresIn: '10d' }
        );
        global.db.query(`UPDATE users SET refreshToken = "${refreshToken}" WHERE id = "${searchUser[0].id}";`);
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24*60*60*1000 });

        res.json({ username: searchUser[0].username, email: searchUser[0].email, accessToken });

    } else {
        res.status(401).json({ 'message': 'The password provided is incorrect.' });
    }
};

const logout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const searchUser = await global.db.query(`SELECT id,username FROM users WHERE refreshToken = "${refreshToken}";`);
    if (!searchUser[0]) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        return res.sendStatus(204);
    }

    global.db.query(`UPDATE users SET refreshToken = NULL WHERE id = "${searchUser[0].id}";`);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

const refreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ 'message': 'You must be logged in.' });
    const refreshToken = cookies.jwt;

    const searchUser = await global.db.query(`SELECT * FROM users WHERE refreshToken = "${refreshToken}";`);
    if (!searchUser[0]) return res.status(403).json({ 'message': 'Forbidden !' });
    
    jwt.verify(
        refreshToken,
        process.env.REFRESHTOKEN_SECRET,
        (err, decoded) => {
            if (err || searchUser[0].username !== decoded.username) return res.status(403).json({ 'message': 'Forbidden !' });
            const roles = searchUser[0].roles.split(',');

            const accessToken = jwt.sign(
                {"user": {
                    "username": decoded.username,
                    "roles": roles
                }},
                process.env.ACCESSTOKEN_SECRET,
                { expiresIn: '10s' }
            );
            res.json({ username: searchUser[0].username, email: searchUser[0].email, accessToken })
        }
    );
}

module.exports = { register, login, logout, refreshToken };