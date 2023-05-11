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
  getArticleById()
    .then((article) => res.status(200).send({ article }))
    .catch((error) => {
      next(error);
    });
};
