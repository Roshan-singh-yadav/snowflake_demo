const express = require('express');
const bodyParser = require("body-parser");

// for establishing connection
const connection = require("./src/libraries/connect")
const homeRoute = require("./src/routes/index")


const app = express();
const PORT = 8000 || process.env.PORT;

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

app.use("/" , homeRoute)

app.listen(PORT, console.log('Server is running on port: ' + PORT));