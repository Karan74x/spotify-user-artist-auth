const mongoose = require("mongoose");

const userSchema = await mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "artist"], default: "user" },
});

const userModel = await mongoose.model("user", userSchema);

module.exports = userModel;
