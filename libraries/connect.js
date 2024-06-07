// Establish connection to snowflake database
const snowflake = require("snowflake-sdk");
const dotenv = require("dotenv");

const crypto = require('crypto');
const privateKeyFile = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDD7mq2eXGFo4X6
gNX4yDcmi1MhIKMn9srOXvB09L1i0ou6I2oWZuNi2h23g76E2eiJaHZd+CTWUSfW
8/Bo4fLmJjTufh5GNwbO4V+Yj90CXhBSGjvhxpFVs78gsBbX7CEEsYic56JwykeV
1qF1zL9avUu/bDAh5MHjhPpqN/eiC178xZsQj93EWMTj0H6I3AZpdi81z0ae1Xtu
3cOsXZI1TvqrzZwhjiO4tMGCt+MPFw1jWWDDJ13vLZKYVCe1dOXidy7wcrjlAqsX
TQbsus/lUkUngbZHCe1fo2hSnhGN4pVXm9XUynS8k57eX92W+fnhAQ8h1jeXH0O7
5fF4ByubAgMBAAECggEAAjHW+/es4Y7WqHSUZDOCu3AYr8ib6A3LJF5xRuLnUvnB
x+viodQ1Atcnn9xRbRwijy6rRY7K6gp04RY3BxQhpbNS3EMJMS2OA947Af+TV0kl
2XP8X+4nlAEUVUtNQWdRnV0k7YECU4CCJpFsM8bl2jnZmEM5eZlRR9+mJtXWp8Sz
M+ujNEwC/cTtzaLM3YYYUgppYZ/5QeDAXVgvA61hwhrfSVFTowu8kB+Nzp5NUQRn
jXYxnJGZxdtXmmcK37I9WOf/FL4V0+UFBU8CQBFH5BI0RaM7aaLKhKFilOLDrW5x
/MJI319cQCpmRWfJEMGYwcalAcilWlvCTz3oY49nhQKBgQD0NQeqXV/UU1efFQ3L
CYEdZ7bbPgij06HuSYzvdW6bGRho/IVgdkyxDTmJM1vdkeV5s3Dri2pBJn8RXKB1
iGD/kewpjD58U0jXJfHH3pO+Qbl4oU1+cpZU+/5wihvm9wzGhL5cgyT/YfTdMe4s
MiH//6m8TbSFSZk9z5J+CTwSBwKBgQDNZJXCIgrMCZCxakGjGVTlisAxL+bUXVl6
WdEssziIvi+Y+gJ4AhkHCDOmlkCZcmkjuRA41NXtXzi4EoBfKmw3hFk6NbsHms+n
HyJHXP0hsn08CEcIIqJ66hPJ+IMV+x720jZab8y3iH67C80RxHFXYiAObvuIdENJ
wAgdhI5kzQKBgQC2emXG9MzlsH0Z3zaWT/zNxzEI9HqqSDqI/yazzBEhDgiCcqcL
ZHp8FkC298yebSWG4gHv0BZOpoBurcMs8AJjFlvc0/HhHq6gLbdUPUoy8ZOwwv9Q
DDmvOTlwSJL+6/383TYNlOVxe3XoTyYEmlVzoEvp7DqHGm7KlC+HxEjBwwKBgC4B
0eniZji+C8Mx4fH+wp2ILvTVngcDwf8+DzTMEGXQ9Ch4GAV5stF4bNlr3pyAnDx8
P737LtA0/Cd/PXITtpnY84OudW6GpuzwdGU31xutN5Ay6nZQC8UsmbIsEHDkB1OS
Usp/MIQL9xc+1XidYCYKvNN+2KkAIfJrKWYzQxIhAoGAMRk6g508e0WwKP9aV6m8
3qnuxg5+66+tCplCwSRSHuxbby5ZR0xQ37gx/3JlLiDy9M4c4jC/5zGisAtF3SU4
HmQaa6MCmvZ/pCzPEjO+d+j8epYtvxxTpBpXPnl1iV8NMY8Uux6hYw9kTd76qAF8
uGve/01Lx+PXTaz9GWgXKdI=
-----END PRIVATE KEY-----`

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
try {
  connection.connect((err, conn) => {
    console.log("Connected to snowflake : " + JSON.stringify(conn));
  });
} catch (err) {
  console.error("Unable to connect to Snowflake", err);
}

module.exports = connection;
