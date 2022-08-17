require("dotenv").config();
require("./db/mongoose");

const express = require("express");
const app = express();

const socketServer = require("http").createServer(app);
const io = require("socket.io")(socketServer);
const crypto = require("crypto");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const { authenticate } = require("./middleware/authenticate");
const { updateUser, getUser } = require("./controllers/user");
const sanitize = require("mongo-sanitize");

// Middleware Config
app.set("socketio", io);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("tiny"));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// CORS Config
if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: [
        process.env.PRODUCTION_URL,
        process.env.SOCKET_PRODUCTION_URL,
        process.env.CNAME_URL,
      ],
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      origin: [
        `http://localhost:3000`,
        "ws://localhost:3000",
        `http://127.0.0.1:3000`,
        "ws://127.0.0.1:3000",
      ],
      credentials: true,
      contentType: "*",
    })
  );
}

// PORT
const PORT = process.env.PORT || 5000;

// Deployment Config
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/client/public")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../frontend", "client", "public", "index.html")
    );
  });
}

// Routes
const login = require("./routes/login");

// Use Routes
app.use("/api/user", login);

socketServer.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});

io.on("connect", (socket) => {
  console.log(socket.conn.server.clientsCount);
  try {
    console.log(socket.id);
  } catch (e) {
    console.log(e);
  }

  socket.on("/api/user/update", async (data) => {
    authenticate(socket).then((account) => {
      sanitize(data);
      sanitize(account);
      updateUser(data, account, socket);
    });
  });

  socket.on("/api/user/find", async (data) => {
    sanitize(data);
    getUser(data, socket);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});
