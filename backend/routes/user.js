const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const { findUser, updateUser } = require("../controllers/user");

// @route   GET api/user/:id
// @desc    returns the specified user
// @access  Public
router.get("/:id", findUser);

// @route   POST api/user/update
// @desc    updates the specified user
// @access  Private
router.post("/update", auth, updateUser);

module.exports = router;
