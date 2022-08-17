const axios = require("axios");
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const bs58 = require("bs58");
const User = require("../models/User");
s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const { v4: uuidv4 } = require("uuid");
const sanitize = require("mongo-sanitize");
const nacl = require("tweetnacl");
const {
  Connection,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  PublicKey,
  Keypair,
  sendAndConfirmTransaction,
  signAndSendTransaction,
} = require("@solana/web3.js");

exports.user = async (data, account, socket) => {
  try {
    return "pong";
  } catch (e) {
    console.log(e);
  }
};

exports.updateUser = async (data, account, socket) => {
  try {
    if (!account.username) return console.log("Unauthorized");

    const user = await User.findOne({ username: account.username });

    if (!user) {
      return console.log("user not found");
    }

    const updatedUsername = data.username;
    const updatedFirstName = data.firstName;
    const updatesLastName = data.lastName;

    if (updatedUsername.length > 15) {
      return console.log("Chracter limit is 15 for custom usernames");
    }

    console.log(data);

    return "pong";
  } catch (e) {
    console.log(e);
  }
};

exports.getUser = async (data, socket) => {
  try {
    const user = await User.findOne(
      { address: data },
      "-uuid -_id -createdAt -updatedAt -__v"
    );

    if (!user) return console.log("User not found");

    socket.emit("/user/find", user);
  } catch (e) {
    console.log(e);
  }
};
