const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const cssRoutes = require("./routes/cssRoutes");
const jsRoutes = require("./routes/jsRoutes");
const reactRoutes = require("./routes/reactRoutes");
const nodeRoutes = require("./routes/nodeRoutes");
const pythonRoutes = require("./routes/pythonRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api", scoreRoutes);
app.use("/api/html", htmlRoutes);
app.use("/api/css", cssRoutes);
app.use("/api/javascript", jsRoutes);
app.use("/api/reactjs", reactRoutes);
app.use("/api/nodejs", nodeRoutes);
app.use("/api/python", pythonRoutes);




mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected to DB"));
app.listen(5000, () => console.log("Server running on port 5000"));