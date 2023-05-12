<<<<<<< HEAD
=======

>>>>>>> 6e96cfc4d76b85967b12071b945d012d2a731ec9
const {
  getAllTopics,
  getEndpoints,
  getArticleById,
<<<<<<< HEAD
  getArticles,
} = require("../models/topics.models");

=======
} = require("../models/topics.models");


>>>>>>> 6e96cfc4d76b85967b12071b945d012d2a731ec9
exports.sendTopics = (req, res, next) => {
  getAllTopics()
    .then((topics) => res.status(200).send({ topics }))
    .catch((error) => {
      next(error);
    });
};

<<<<<<< HEAD
=======

>>>>>>> 6e96cfc4d76b85967b12071b945d012d2a731ec9
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

<<<<<<< HEAD
exports.sendArticles = (req, res, next) => {
  getArticles()
    .then((result) => res.status(200).send({ result }))
    .catch((error) => {
      next(error);
    });
};
=======
>>>>>>> 6e96cfc4d76b85967b12071b945d012d2a731ec9
