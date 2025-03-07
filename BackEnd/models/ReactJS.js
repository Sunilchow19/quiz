const mongoose = require("mongoose");

const reactSchema = new mongoose.Schema({
    title: String,
    description: String,
});

module.exports = mongoose.model("ReactJS", reactSchema, "ReactJS");
