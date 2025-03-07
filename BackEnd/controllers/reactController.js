const ReactJS = require("../models/ReactJS");

exports.getReactTopics = async (req, res) => {
    try {
        const topics = await ReactJS.find();
        res.json(topics);
    } catch (error) {
        res.status(500).json({ message: "Error fetching React topics", error: error.message });
    }
};
