const mongoose = require("mongoose");

const htmlSchema = new mongoose.Schema({
    title: String,
    description: String,
});

module.exports = mongoose.model("Html", htmlSchema, "Html");
