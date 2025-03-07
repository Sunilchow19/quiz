const express = require("express");
const router = express.Router();
const { getHtmlTopics } = require("../controllers/htmlController");

router.get("/", getHtmlTopics);

module.exports = router;
