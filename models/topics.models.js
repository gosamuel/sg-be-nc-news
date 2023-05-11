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

exports.getArticleById = (article_id) => {};
