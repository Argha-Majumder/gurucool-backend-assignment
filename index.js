const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const db = require('./config/mongoose');

app.use(express.json());
app.use('/', require('./routes'));

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server on port ${port}`, err);
    }
    console.log(`Server is running on port ${port}`);
});