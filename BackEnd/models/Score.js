
const mongoose = require("mongoose");
const ScoreSchema = new mongoose.Schema({
    username: String,
    score: Number,
    topic: String
}, { versionKey: false });

module.exports = mongoose.model("Score", ScoreSchema,"scores");