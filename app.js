const express = require("express");
const {
  sendTopics,
  sendArticleById,
  sendEndpoints,
  sendArticles,
  sendArticleComments,
} = require("./controllers/controllers");

const app = express();

app.get("/api", sendEndpoints);

app.get("/api/topics", sendTopics);

app.get("/api/article/:article_id", sendArticleById);

app.get("/api/articles", sendArticles);

app.get("/api/articles/:article_id/comments", sendArticleComments);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Server Error" });
});

module.exports = { app };
