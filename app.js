const express = require("express");
const {
  sendTopics,
  sendArticleById,
  sendEndpoints,
  sendArticles,
  sendArticleComments,
  addComment,
  patchVote,
  deleteComment,
} = require("./controllers/controllers");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/api", sendEndpoints);

app.get("/api/topics", sendTopics);

app.get("/api/article/:article_id", sendArticleById);

app.get("/api/articles", sendArticles);

app.get("/api/articles/:article_id/comments", sendArticleComments);

app.use(express.json());

app.post("/api/articles/:article_id/comments", addComment);

app.patch("/api/articles/:article_id", patchVote);

app.delete("/api/comments/:comment_id", deleteComment);

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else next;
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Server Error" });
});

module.exports = { app };
