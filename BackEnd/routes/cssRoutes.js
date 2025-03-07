const express = require("express");
const router = express.Router();
const { getCssTopics } = require("../controllers/cssController");

router.get("/", getCssTopics);

module.exports = router;
