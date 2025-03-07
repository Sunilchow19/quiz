const NodeJS = require("../models/NodeJS");

exports.getNodeTopics = async (req, res) => {
    try {
        const topics = await NodeJS.find();
        res.json(topics);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Node.js topics", error: error.message });
    }
};
