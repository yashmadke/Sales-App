const UserModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// const { SECRET_KEY } = process.env.SECRET_KEY;

// function to handle user registeration
const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // checking if all the fields are filled
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ Error: "All fields are mandotry" });
    }

    // checking if email is already registered
    let sameEmail = await UserModel.findOne({ email });

    if (sameEmail) {
      return res
        .status(400)
        .json({ Error: "Email already registered, please login" });
    }

    // hashing the password before storing to the database
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      firstname,
      lastname,
      email,
      password: hashPassword,
    });

    await newUser.save();

    return res
      .status(200)
      .json({ Message: "Registration Successful", newUser });
  } catch (error) {
    console.error("Error occured while registration", error);
  }
};

// function to handle user login
const login = async (req, res) => {
  const { email, password } = req.body;

  // checking if all fields are filled
  if (!email || !password) {
    return res.status(400).json({ Error: "All fields are mandotary" });
  }

  // checking the user is registered or not
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ Error: "Please register first" });
  }

  // matching the password with the hash password from the database
  const match = await bcrypt.compare(password, user.password);

  if (match) {
    // generating a JWT token with user ID and email
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });

    return res
      .status(200)
      .json({ Message: "User logged-in successfully!", token, user: payload });
  } else {
    return res.status(400).json({ Error: "Please check password" });
  }
};

module.exports = { register, login };
