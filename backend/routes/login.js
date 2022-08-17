const express = require("express");
const router = new express.Router();
const { login, logout } = require("../auth/login");

// @route   POST api/user/login
// @desc    login user
// @access  Public
router.post("/login", login);

router.post("/logout", logout);

module.exports = router;
