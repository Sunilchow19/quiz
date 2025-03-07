const Python = require("../models/Python");

exports.getPythonTopics = async (req, res) => {
    try {
        const topics = await Python.find();
        res.json(topics);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Python topics", error: error.message });
    }
};
