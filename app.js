const express = require("express");
const { sendTopics } = require("./controllers/topics.controllers");

const app = express();

app.use(express.json());

app.get("/api/topics", sendTopics);

module.exports = { app };
