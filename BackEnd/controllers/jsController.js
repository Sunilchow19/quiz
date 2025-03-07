const JavaScript = require("../models/JavaScript");

exports.getJsTopics = async (req, res) => {
    try {
        const topics = await JavaScript.find();
        res.json(topics);
    } catch (error) {
        res.status(500).json({ message: "Error fetching JavaScript topics", error: error.message });
    }
};
