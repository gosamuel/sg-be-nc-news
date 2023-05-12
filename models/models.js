const db = require("../db/connection");
const fs = require("fs/promises");

exports.getAllTopics = () => {
  return db.query(`SELECT * FROM topics`).then((result) => result.rows);
};

exports.getEndpoints = () => {
  return fs.readFile(
    "/Users/samgower/northcoders/backend/be-nc-news/endpoints.json",
    "utf8"
  );
};

exports.getArticleById = (articleId) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [articleId])
    .then((result) => result.rows[0]);
};

exports.getArticles = () => {
  return db
    .query(
      `SELECT article_id, title, topic, author, created_at, votes, article_img_url 
     FROM articles
     ORDER BY created_at DESC`
    )
    .then((result) => result.rows);
};

exports.getArticleComments = (articleId) => {
  return db
    .query(
      `SELECT comments FROM articles WHERE article_id = $1 ORDER BY created_at DESC`,
      [articleId]
    )
    .then((result) => result.rows);
};
