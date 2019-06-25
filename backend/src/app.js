require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const express = require("express");
const cors = require("cors");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

class AppController {
  constructor() {
    this.express = app;
    this.serverHTTPAndSocketIO = server;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use((req, res, next) => {
      req.io = io;
      next();
    });

    this.express.use(cors());
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new AppController().serverHTTPAndSocketIO;
