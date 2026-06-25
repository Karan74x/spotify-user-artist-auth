const userModel = require("../models/auth.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  try {
    const { username, email, password, role = "user" } = req.body;

    //checking if user
    const isUserExists = await userModel.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (isUserExists) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    //for hiding password
    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hash,
      role,
    });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.SECRET_KEY,
    );

    //saving token in cookie storage
    res.cookie("token", token);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = { registerUser };
