const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc    Register new admin
// @route   POST /api/admin/register
const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
    console.log(req.body)
  try {
    // Check if admin exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) return res.status(400).json({ success: false, message: "Admin already exists" });

    // Create new admin
    const admin = new Admin({ name, email, password });

    await admin.save()

    if (admin) {
      res.status(201).json({
        success: true,
        message: "Admin registered successfully",
        _id: admin.id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin.id),
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid admin data" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Login admin
// @route   POST /api/admin/login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.json({
        success: true,
        message: "Login successful",
        _id: admin.id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin.id),
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { registerAdmin, loginAdmin };
