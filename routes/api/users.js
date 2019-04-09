const router = require("express").Router();
const brcypt = require("bcryptjs");
const mongoose = require("mongoose");
const { User } = require("../../models/index");
router.post("/register", (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(401).json({ msg: "Email already registered" });
    }
    const newUser = new User({
      name,
      email,
      password,
      avatar
    });
    brcypt.genSalt(10, (err, salt) => {
      brcypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          res.json(user);
        });
      });
    });
  });
});

module.exports = router;
