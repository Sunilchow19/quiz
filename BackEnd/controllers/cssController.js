const Css = require("../models/Css");

exports.getCssTopics = async (req, res) => {
    try {
        const topics = await Css.find();
        res.json(topics);
    } catch (error) {
        res.status(500).json({ message: "Error fetching CSS topics", error: error.message });
    }
};
