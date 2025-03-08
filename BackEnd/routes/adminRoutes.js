const express = require("express");

const adminRouter = express.Router();
const { adminLogin } = require("../controllers/adminController");
adminRouter.post("/admin", adminLogin);
module.exports = adminRouter;