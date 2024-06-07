// Establish connection to snowflake database
const snowflake = require("snowflake-sdk");
const dotenv = require("dotenv");

const crypto = require('crypto');
const fs = require('fs');
const privateKeyFile = fs.readFileSync("./rsa_key.p8");

// Enable environment variables in .env file
dotenv.config();

// Get the private key from the file as an object.
const privateKeyObject = crypto.createPrivateKey({
  key: privateKeyFile,
  format: 'pem',
  passphrase: 'passphrase'
});

// Extract the private key from the object as a PEM-encoded string.
const privateKey = privateKeyObject.export({
  format: 'pem',
  type: 'pkcs8'
});


// connection parameters
const connection = snowflake.createConnection({
  account: process.env.ACCOUNT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  authenticator: process.env.AUTHONTICATOR,
  database: process.env.DATABASE,
  schema: process.env.SCHEMA,
  privateKey: privateKey,
});

// 4.2.3 create the connection to the Snowflake account
connection.connect((err, conn) => {
  if (err) {
    console.error("Unable to connect to Snowflake", err);
  } else {
    console.log("Connected to snowflake : " + JSON.stringify(conn));
  }
});

module.exports = connection;
