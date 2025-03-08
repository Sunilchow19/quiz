const CSS = require("../models/Css");

exports.getCssTopics = async (req, res) => {
    try {
        const topics = await CSS.find();
        res.json(topics);
    } catch (error) {
        res.status(500).json({ message: "Error fetching CSS topics", error: error.message });
    }
};
