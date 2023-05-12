const express = require("express");

const {
  sendTopics,
  sendArticleById,
  sendEndpoints,
} = require("./controllers/topics.controllers");

const app = express();

app.get("/api", sendEndpoints);

app.get("/api/topics", sendTopics);

app.get("/api/article/:article_id", sendArticleById);



app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Server Error" });
});

module.exports = { app };
