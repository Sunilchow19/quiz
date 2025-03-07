const mongoose = require("mongoose");

const nodeSchema = new mongoose.Schema({
    title: String,
    description: String,
});

module.exports = mongoose.model("NodeJS", nodeSchema, "NodeJS");
