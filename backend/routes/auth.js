const express = require("express");
const Book = require("../models/Book");
const router = express.Router();
const _ = require("lodash");
const UserValidator = require("../models/UserValidator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     console.log(req.body);
//     if (email === "admin@root.com" && password === "jQrffe03124957") {
//       return res.send("login");
//     }
//     return res.send("email / password incorrect");
//   });

router.post("/signup", async (req, res) => {
  const user = req.body;
  const { error, value } = UserValidator(user, "signup");
  if (error) return res.status(400).send({ err: error.details[0].message });

  const { username, email, password } = value;

  //   check if email exists
  const e = await User.findOne({ email });
  if (e) return res.status(400).send({ err: "This email is used" });

  // save user
  const len = await User.find().count();
  const salt = await bcrypt.genSalt(12);
  value.password = await bcrypt.hash(password, salt);
  const newuser =
    len === 0 ? new User({ ...value, isAdmin: true }) : new User(value);
  newuser.save();
  return res
    .status(200)
    .send({ msg: "account has been created. now you can login", status: 200 });
});

router.post("/login", async (req, res) => {
  const user = req.body;
  const { error, value } = UserValidator(user, "login");
  if (error) return res.status(400).send({ err: error.details[0].message });

  const { email, password } = value;

  //   check user
  const u = await User.findOne({ email });
  if (!u) return res.status(400).send({ err: "email / password incorrect" });

  const isValid = await bcrypt.compare(password, u.password);

  if (isValid) {
    const token = jwt.sign(
      { _id: u._id, isAdmin: u.isAdmin },
      process.env.JWT_KEY
    );

    return res.status(200).send({ msg: "login success", token });
  } else {
    return res.status(400).send({ err: "email / password incorrect" });
  }
});

module.exports = router;
