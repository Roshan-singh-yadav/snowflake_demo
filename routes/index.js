const express = require("express");
const router = express.Router();

const { greeting, getUsers } = require("../controllers/home-controller");

router.get("/", greeting);
router.get("/users", getUsers);

module.exports = router;
