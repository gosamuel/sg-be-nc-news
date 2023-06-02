const { log } = require("console");
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
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,
      [articleId]
    )
    .then((result) => result.rows);
};

exports.insertComment = (username, body, article_id) => {
  return db
    .query(
      `INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *;`,
      [body, username, article_id]
    )
    .then(({ rows }) => rows[0]);
};

exports.handleVote = (article_id, vote) => {
  return db.query(
    `UPDATE articles
    SET
    votes = votes + ${vote}
    WHERE article_id = ${article_id}
    RETURNING *;`
  );
};

exports.handleDelete = (comment_id) => {
  return db.query(
    `DELETE FROM comments
    WHERE comment_id = ${comment_id}
    RETURNING *;`
  );
};

exports.getUsers = () => {
  return db.query(
    `SELECT username name avatar_url FROM users
    RETURNING *;`
  );
};

exports.getArticlesByTopic = (topic) => {
  return db.query(`SELECT * FROM articles WHERE topic = ${topic} RETURNING *;`);
};
