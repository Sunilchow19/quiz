const Admin = require("../models/Admin");

exports.adminLogin = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if ((!email && !username) || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const adminUser = await Admin.findOne({ $or: [{ email }, { name: username }] });
        if (!adminUser) {
            return res.status(400).json({ success: false, message: "Admin not found" });
        }
        res.status(200).json({ success: true, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};