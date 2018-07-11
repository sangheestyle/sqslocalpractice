const express = require('express');
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello world\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);