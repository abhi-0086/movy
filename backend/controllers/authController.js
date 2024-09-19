const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerValidationSchema,
  loginValidationSchema,
} = require("../validations/authValidation");

//register user
const registerUser = async (req, res) => {
  const { error } = registerValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  const { username, email, password } = req.body;

  try {
    //check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(404)
        .json({ msg: "User already exist with provided email" });
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create a new user
    user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    //generate jwt token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Oops, something went wrong!" });
  }
};

//login
const loginUser = async (req, res) => {
  const { error } = loginValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  const { email, password } = req.body;

  try {
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials!!" });
    }

    //check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials!!" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Uh-oh, something went wrong!" });
  }
};

module.exports = { registerUser, loginUser };
