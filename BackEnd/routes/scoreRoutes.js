const express = require("express");
const scoreRouter = express.Router();
const { submitScore, getScores } = require("../controllers/scoreController");
scoreRouter.post("/score", submitScore);
scoreRouter.get("/scores", getScores);
module.exports = scoreRouter;