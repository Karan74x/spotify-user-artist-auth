const express = require("express");
const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const app = express();
const musicRoutes = require("./routes/music.routes");

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);
module.exports = app;
