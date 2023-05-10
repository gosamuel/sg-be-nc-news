const express = require("express");
const { sendTopics } = require("./controllers/topics.controllers");

const app = express();

app.get("/api/topics", sendTopics);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Server Error" });
});

module.exports = { app };
