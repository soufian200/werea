const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    dateCreated: { type: Date, default: Date.now },
    // isActive: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
  })
);

module.exports = User;
