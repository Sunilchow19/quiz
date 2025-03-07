const express = require("express");
const router = express.Router();
const { getReactTopics } = require("../controllers/reactController");

router.get("/", getReactTopics);

module.exports = router;
