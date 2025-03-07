const Html = require("../models/Html");

exports.getHtmlTopics = async (req, res) => {
    try {
        const topics = await Html.find();
        res.json(topics);
    } catch (error) {
        res.status(500).json({ message: "Error fetching HTML topics", error: error.message });
    }
};
