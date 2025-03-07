const express = require("express");
const router = express.Router();
const { getNodeTopics } = require("../controllers/nodeController");

router.get("/", getNodeTopics);

module.exports = router;
