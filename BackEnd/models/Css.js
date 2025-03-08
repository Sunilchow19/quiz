const mongoose = require("mongoose");

const cssSchema = new mongoose.Schema({
    title: String,
    description: String,
});

module.exports = mongoose.model("CSS", cssSchema, "CSS");
