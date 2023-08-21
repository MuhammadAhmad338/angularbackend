const express = require("express");
const authrouter = express.Router();
const {signin, signup } = require('../Controller/authController');

authrouter.post("/signin", signin);
authrouter.post("/signup", signup);

module.exports = authrouter;