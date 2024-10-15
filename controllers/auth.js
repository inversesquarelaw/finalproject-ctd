const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  // we handle the salt and hash in the model using a pre-save hook
  // we also handle the token creation in the model
  const user = await User.create({ ...req.body });
  const token = user.createJWT(); //moved token logic to the User model
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });

  //res.send("register user");
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  // find the user by email
  const user = await User.findOne({ email });

  // if email doesn't exist, throw an error
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials - User not found");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials - Password incorrect");
  }

  // else we found the email, now we compare the password
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });

  //res.send("login user");
};

module.exports = {
  register,
  login,
};
