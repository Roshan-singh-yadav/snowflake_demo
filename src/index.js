const cors = require('cors')
const express = require('express');

// for establishing connection
const homeRoute = require("./routes/index")
const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(cors())

const connection = require("./libraries/connect")

app.use("/", homeRoute);

app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
