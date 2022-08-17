const jwt = require("jsonwebtoken");

// Run authentication on socket connections
exports.authenticate = async (socket) => {
  try {
    const cookie = socket.request.headers.cookie;

    if (!cookie) {
      return { error: "Access Denied" };
    }

    const token = cookie.split("=")[1];

    if (!token) {
      return { error: "Access Denied" };
    }

    const account = jwt.verify(token, process.env.jwtsecret);

    if (!account) {
      return { error: "Access Denied" };
    }

    return account;
  } catch (e) {
    socket.emit("unauthorized");
    console.log(e);
    return e;
  }
};
