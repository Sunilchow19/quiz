const express = require("express");
const router = express.Router();
const { getJsTopics } = require("../controllers/jsController");

router.get("/", getJsTopics);

module.exports = router;
