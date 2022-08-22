const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sanitize = require("mongo-sanitize");
const User = require("../models/User");
const { resolveToWalletAddress } = require("@nfteyez/sol-rayz");

exports.findUser = async (req, res) => {
  try {
    const user = await User.findOne(
      { address: sanitize(req.params.address) },
      "-uuid -_id -balance -createdAt -updatedAt -__v"
    );

    if (!user) return res.status(404).send({ message: "User not found." });

    console.log(user);

    return res.status(200).send(user);
  } catch (e) {
    console.log(e);
    return res.status(404).send({ message: "User not found." });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { firstName, lastName, username, country, timezone } = sanitize(
      req.body
    );

    // Get authenticated user
    const user = await User.findOne(
      { uuid: sanitize(req.user.id) },
      "-uuid -createdAt -updatedAt -__v"
    );

    // If user isn't found return
    if (!user) {
      console.log("Unauthorized");
      return res.status(404).send({ message: "Authentication error." });
    }

    // Check that first & last name is greater than 2 char & less than 21
    if (firstName === "" || (firstName.length >= 2 && firstName.length <= 20)) {
      user.firstName = firstName.replace(/[^a-zA-Z ]/g, "");
    }

    if (lastName === "" || (lastName.length >= 2 && lastName.length <= 20)) {
      user.lastName = lastName.replace(/[^a-zA-Z ]/g, "");
    }

    // Check that username isn't empty, is greater than four characters and isn't the defaulted wallet address
    if (
      username !== "" &&
      username.toLocaleLowerCase !== "unclaimed" &&
      username.length > 4 &&
      username.toLowerCase() !== user.address.toLocaleLowerCase()
    ) {
      const isUsernameTaken = await User.findOne({
        username: username.replace(/[^a-zA-Z0-9]/g, ""),
      });

      // Check that the username isn't the current users username TODO: can be done better later
      if (isUsernameTaken && username !== user.username) {
        res.status(409).send({ message: "Username already exist." });
        return console.log("Username already exist.");
      }

      // save the username
      user.username = username.replace(/[^a-zA-Z0-9]/g, "");
    }

    if (country && country !== "") {
      user.country = country;
    }

    if (timezone && timezone !== "") {
      user.timezone = timezone;
    }

    await user.save();

    return res.status(201).send(user);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: "Something went wrong." });
  }
};
