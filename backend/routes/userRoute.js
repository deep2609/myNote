const express = require("express");
const { createUser } = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(createUser);

module.exports = router;