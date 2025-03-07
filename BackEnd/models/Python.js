const mongoose = require("mongoose");

const pythonSchema = new mongoose.Schema({
    title: String,
    description: String,
});

module.exports = mongoose.model("Python", pythonSchema, "Python");
