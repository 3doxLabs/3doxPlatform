const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    let token = req.cookies;

    token = JSON.stringify(token).split(`"`)[3];

    //  check for token
    if (!token) {
      res.clearCookie(process.env.TOKEN_PSUEDO_NAME);
      return res.status(400).send({ authError: "Access denied" });
    }

    //  Verify token
    req.user = jwt.verify(token, process.env.jwtsecret);

    if (req.user) {
      // Send a new Token
      jwt.sign(
        {
          // set the payload as user's uuid
          username: req.user.username,
        },
        process.env.jwtsecret,
        //  set expiration to 12 hour
        { expiresIn: "12h" },
        (err, token) => {
          if (err) {
            console.log(err);
            res.clearCookie(process.env.TOKEN_PSUEDO_NAME);
            return res.status(400).send({ error: "Invalid Credentials" });
          }
          // send user data and token to client
          res.cookie(process.env.TOKEN_PSUEDO_NAME, token);
        }
      );
    }

    // Continue to next middleware
    next();
  } catch (e) {
    res.clearCookie(process.env.TOKEN_PSUEDO_NAME);
    return res.status(400).send({ authError: "Access denied" });
  }
};

module.exports = auth;
