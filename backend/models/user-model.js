const mongoose = require("mongoose");

// defining the schema for user data
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

// creating a model named "UserModel" based on the userSchema
const UserModel = mongoose.model("UserModel", userSchema);

module.exports = UserModel;
