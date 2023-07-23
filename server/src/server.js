global.db = require('../database/db');
require('dotenv').config()

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middlewares/verifyJWT');
console.log("\x1b[36m%s\x1b[0m", `Starting the server side...\n`);

const app = express();
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/user', require('./routes/user'));

// Private routes
app.use(verifyJWT);
app.use('/users', require('./routes/users'));

app.get('*', (req, res) => { res.status(404).json({'message': "Not found"}) })

app.listen(process.env.PORT, () => {
    console.log("\x1b[32m%s\x1b[0m", `App listening on port ${process.env.PORT}`);
})