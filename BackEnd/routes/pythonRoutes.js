const express = require("express");
const router = express.Router();
const { getPythonTopics } = require("../controllers/pythonController");

router.get("/", getPythonTopics);

module.exports = router;
