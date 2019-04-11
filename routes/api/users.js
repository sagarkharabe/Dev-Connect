const router = require("express").Router();
const brcypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const gravitar = require("gravatar");
const { User } = require("../../models/index");
const keys = require("../../config/keys");
const passport = require("passport");

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(401).json({ msg: "Email not registered" });
    }
    brcypt.compare(password, user.password).then(async result => {
      if (!result) return res.status(400).json({ msg: "Wrong Password" });
      const token = await jwt.sign({ id: user.id }, keys.JWT_SECRECT_KEY, {
        expiresIn: 3600
      });
      res.status(200).json({
        token: "Bearer " + token,
        user: user
      });
    });
  });
});

router.post("/register", (req, res) => {
  console.log(req.body);
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(401).json({ msg: "Email already registered" });
    }
    const avatar = gravitar.url(req.body.email, {
      s: "200",
      r: "pg",
      d: "mm"
    });
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
        newUser
          .save()
          .then(user => {
            res.json(user);
          })
          .catch(err => {
            console.log("Err at create user -- ", err);
            res.status(400).json({ msg: "Error while creating new User." });
          });
      });
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar
    });
  }
);
module.exports = router;
