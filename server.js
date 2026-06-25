require("dotenv").config();
const connectDB = require("./src/db/db");
const express = require("express");

const app = express();

const startServer = async () => {
  try {
    await connectDB();

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (err) {
    console.log("Server startup failed");
  }
};

startServer();
