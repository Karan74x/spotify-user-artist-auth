const userModel = require("../models/auth.model");

async function registerUser(req, res) {
  const { username, email, password, role = "user" } = req.body;

  //checking if user
  const isUserExists = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if(isUserExists)
  {
    return res.status()
  }
}
