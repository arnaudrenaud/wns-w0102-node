const express = require("express");
const mongoose = require("mongoose");

const wilderControllers = require("./controllers/wilder");

mongoose
  .connect("mongodb://127.0.0.1:27017/wilderdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  })
  .then(() => console.log("Connected to database."))
  .catch((err) => console.error(err));

const server = express().use(express.json());

const asyncErrorHandler = (callback) => (req, res) => {
  callback(req, res).catch((err) => {
    res.status(500).json({ err });
  });
};

server.get("/", (req, res) => {
  res.send("Hello over HTTP");
});

server.post("/api/wilders", asyncErrorHandler(wilderControllers.create));
server.get("/api/wilders", asyncErrorHandler(wilderControllers.get));
server.put("/api/wilders/:id", asyncErrorHandler(wilderControllers.update));
server.delete("/api/wilders/:id", asyncErrorHandler(wilderControllers.delete));

server.listen(3000, () => {
  console.log("Server listening on port 3000.");
});