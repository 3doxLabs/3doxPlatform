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
