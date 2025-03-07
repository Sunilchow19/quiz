const mongoose = require("mongoose");

const cssSchema = new mongoose.Schema({
    title: String,
    description: String,
});

module.exports = mongoose.model("Css", cssSchema, "Css");
