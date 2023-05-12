const express = require("express");
<<<<<<< HEAD
=======

>>>>>>> 6e96cfc4d76b85967b12071b945d012d2a731ec9
const {
  sendTopics,
  sendArticleById,
  sendEndpoints,
<<<<<<< HEAD
  sendArticles,
=======
>>>>>>> 6e96cfc4d76b85967b12071b945d012d2a731ec9
} = require("./controllers/topics.controllers");

const app = express();

app.get("/api", sendEndpoints);

app.get("/api/topics", sendTopics);

app.get("/api/article/:article_id", sendArticleById);

<<<<<<< HEAD
app.get("/api/articles", sendArticles);
=======

>>>>>>> 6e96cfc4d76b85967b12071b945d012d2a731ec9

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Server Error" });
});

module.exports = { app };
