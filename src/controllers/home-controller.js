const connection = require("../libraries/connect")
const sql = require('../services/sql')

const greeting = (req, res) => {
  return res.json("Welcome to MVC structure");
};

const getUsers = (req, res) => {
  connection.execute({
    sqlText: sql.get_all_users,
    complete: (err, stmt, rows) => {
      if (err) {
        console.error("Unable to retrieve franchises", err);
        res.status(500).json({ error: "Unable to retrieve franchises" });
      } else {
        res.status(200).json(rows);
      }
    },
  });
};

module.exports = {
  greeting,
  getUsers,
};
