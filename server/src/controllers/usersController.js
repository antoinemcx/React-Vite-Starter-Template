require('dotenv').config()

const getAllUsers = async (req, res) => {
    const users = await global.db.query(`SELECT * FROM users;`);
    if (!users[0]) return res.status(204).json({ 'message': 'No users found' });

    res.json(users);
};

module.exports = { getAllUsers };