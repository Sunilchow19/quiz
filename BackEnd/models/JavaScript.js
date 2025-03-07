const mongoose = require("mongoose");

const jsSchema = new mongoose.Schema({
    title: String,
    description: String,
});

module.exports = mongoose.model("JavaScript", jsSchema, "JavaScript");
