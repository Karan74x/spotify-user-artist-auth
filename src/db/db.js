const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Success: Database Connected");
  } catch (err) {
    console.log("Error: ", err.message);
  }
}

module.exports = connectDB;
