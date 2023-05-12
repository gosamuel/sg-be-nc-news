
const {
  getAllTopics,
  getEndpoints,
  getArticleById,
} = require("../models/topics.models");


exports.sendTopics = (req, res, next) => {
  getAllTopics()
    .then((topics) => res.status(200).send({ topics }))
    .catch((error) => {
      next(error);
    });
};


exports.sendEndpoints = (req, res, next) => {
  getEndpoints()
    .then((endpoints) => res.status(200).send({ endpoints }))
    .catch((error) => {
      next(error);
    });
};

exports.sendArticleById = (req, res, next) => {
  const { article_id } = req.params;
  getArticleById(article_id)
    .then((result) => res.status(200).send({ article: result }))
    .catch((error) => {
      next(error);
    });
};

