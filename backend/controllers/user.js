const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sanitize = require("mongo-sanitize");
const User = require("../models/User");

exports.findUser = async (req, res) => {
  try {
    const id = sanitize(req.params.id);

    const user = await User.findOne(
      { address: id },
      "-uuid -_id -balance -createdAt -updatedAt -__v"
    );

    if (!user) return res.status(400).send({ error: "User not found." });

    console.log(user);

    return res.status(200).send(user);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ error: "User not found." });
  }
};

exports.updateUser = async (req, res) => {
  try {
    console.log(req.body);
    return res.status(201).send({ message: "success" });
  } catch (e) {
    console.log(e);
    return res.status(404).send({ error: "User not found." });
  }
};
