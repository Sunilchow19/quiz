const Admin = require("../models/Admin");

exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body; 

        if (!username || !password) {
          return res.status(400).json({ success: false, message: "Username and password are required" });
        }
        
        const adminUser = await Admin.findOne({ username: { $regex: new RegExp("^" + username.trim() + "$", "i") } });


        console.log(adminUser)

        if (!adminUser) {
            return res.status(400).json({ success: false, message: "Admin not found" });
        }

        res.status(200).json({ success: true, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
