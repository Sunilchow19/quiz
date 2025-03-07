const Score = require("../models/Score");

exports.submitScore = async (req, res) => {
    try {
        let newData = new Score(req.body);
        await newData.save();
        res.status(200).json({ message: "Success" });
    } catch (error) {
        res.status(500).json({ message: "Error saving data" });
    }
};

exports.getScores = async (req, res) => {
    try {
        let scores = await Score.find().sort({ score: -1 });
        res.status(200).json(scores);
    } catch (error) {
        res.status(500).json({ message: "Error fetching scores" });
    }
};