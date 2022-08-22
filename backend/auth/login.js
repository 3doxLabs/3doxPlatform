const sanitize = require("mongo-sanitize");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bs58 = require("bs58");
const nacl = require("tweetnacl");
// const Token = require("../models/Token");
// const { getUSDCBalance, getSolBalance } = require("../helpers/calls");
const { PublicKey, Keypair } = require("@solana/web3.js");

// @route   POST api/user/login
// @desc    Login user
// @access  Public
exports.login = async (req, res) => {
  try {
    let signature;
    const pk = new PublicKey(sanitize(req.body.address));
    const message = `Login as ${req.body.address}`;
    const address = sanitize(req.body.address);

    const uInt8Message = new TextEncoder().encode(message);

    if (req.body.signature.data) {
      signature = new Uint8Array(req.body.signature.data);
    } else {
      signature = new Uint8Array(Object.values(req.body.signature));
    }

    const pkUint8 = bs58.decode(pk.toString());

    const isVerified = await nacl.sign.detached.verify(
      uInt8Message,
      signature,
      pkUint8
    );

    if (!isVerified) {
      return res.status(404).send({ error: "user not found" });
    }

    let user = await User.findOne({ address: sanitize(req.body.address) });

    if (!user) {
      user = new User({
        username: pk.toString(),
        address,
        firstName: "",
        lastName: "",
        karma: 0,
        avatar: "",
        balance: 0.0,
        rating: 0.0,
        reviews: 0,
        experience: [],
        skills: [],
        earned: 0,
        spent: 0,
        createdAt: Date.now(),
        uuid: uuidv4(),
      });

      await user.save();
    }

    jwt.sign(
      { id: user.uuid },
      process.env.jwtsecret,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          return res.status(400).send({ error: "InvalidCredentials" });
        }

        res.cookie(process.env.TOKEN_PSUEDO_NAME, token, {
          secure: process.env.NODE_ENV !== "development",
        });

        return res.status(200).send({
          username: user.username,
          address: user.address,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          balance: user.balance,
          rating: user.rating,
          karma: user.karma,
          reviews: user.reviews,
          experience: user.experience,
          skills: user.skills,
          earned: user.earned,
          spent: user.spent,
        });
      }
    );
  } catch (e) {
    console.log(e);
    return res.status(404).send({ error: "user not found" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie(process.env.TOKEN_PSUEDO_NAME);

    return res.status(200).send({ message: "disconnected" });
  } catch (e) {
    console.log(e);
  }
};
