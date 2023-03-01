const express = require('express');
const cors = require('cors');
const dbConnection = require('./database/config');
require('dotenv').config();
const logger = require('morgan')

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

dbConnection();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));

app.listen(process.env.port, () => {
    console.log(`Servidor en el puerto ${process.env.port}`)
});