const {
  getAllTopics,
  getEndpoints,
  getArticleById,
  getArticles,
  getArticleComments,
  insertComment,
  handleVote,
  handleDelete,
  getUsers,
  getArticlesByTopic,
} = require("../models/models");

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

exports.sendArticles = (req, res, next) => {
  getArticles()
    .then((result) => res.status(200).send({ result }))
    .catch((error) => {
      next(error);
    });
};

exports.sendArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  getArticleComments(article_id)
    .then((result) => res.status(200).send({ article: result }))
    .catch((error) => {
      next(error);
    });
};

exports.addComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  insertComment(username, body, article_id)
    .then((comment) => res.status(201).send({ comment }))
    .catch((error) => {
      next(error);
    });
};

exports.patchVote = (req, res, next) => {
  const { article_id } = req.params;
  const { vote } = req.body;
  handleVote(article_id, vote)
    .then((vote) => res.status(201).send(vote))
    .catch((error) => {
      next(error);
    });
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  handleDelete(comment_id)
    .then((comment) => res.status(204).send(comment))
    .catch((error) => {
      next(error);
    });
};

exports.sendUsers = (req, res, next) => {
  getUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((error) => {
      next(error);
    });
};

exports.sendArticleByTopic = (req, res, next) => {
  const { topic } = req.params;
  getArticlesByTopic(topic)
    .then((articles) => res.status(200).send(articles))
    .catch((err) => {
      next(err);
    });
};
