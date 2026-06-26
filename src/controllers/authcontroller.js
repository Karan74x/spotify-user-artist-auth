const userModel = require("../models/auth.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//register user
async function registerUser(req, res) {
  try {
    const { username, email, password, role = "user" } = req.body;

    //checking if user exists
    const isUserExists = await userModel.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (isUserExists) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    //hiding password through hashing
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

//login user
async function loginUser(req, res) {
  const { username, email, password } = req.body;
  let user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(401).json({
      message: "invalid credentials",
    });
  }

  const isPassword = await bcrypt.compare(password, user.password);

  if (!isPassword) {
    return res.status(401).json({
      message: "invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.SECRET_KEY,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "login successfull",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}

module.exports = { registerUser, loginUser };
