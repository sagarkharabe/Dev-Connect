const router = require("express").Router();
const brcypt = require("bcryptjs");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const gravitar = require("gravatar");
const { User } = require("../../models/index");
const keys = require("../../config/keys");
const passport = require("passport");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  const { email, password } = req.body;
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      errors.email = "Email not Registered";
      return res.status(401).json(errors);
    }
    brcypt.compare(password, user.password).then(async result => {
      try {
        if (!result) return res.status(400).json({ msg: "Wrong Password" });
        const token = await jwt.sign({ id: user.id }, keys.JWT_SECRET_KEY, {
          expiresIn: 3600
        });
        return res.status(200).json({
          token: "Bearer " + token,
          success: true
        });
      } catch (err) {
        console.log(chalk.red("Err at login route -- ", err));
        errors.login = "Error While logging in.";
        return res.status(400).json(errors);
      }
    });
  });
});

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  console.log("isValid ", isValid);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password, name } = req.body;

  User.findOne({ email }).then(user => {
    if (user) {
      errors.email = "Email already registered";
      return res.status(401).json({ errors });
    }
    const avatar = gravitar.url(email, {
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
            return res.json(user);
          })
          .catch(err => {
            email.save = "There was a error while Registering.";
            console.log("Err at create user -- ", err);
            return res.status(400).json(errors);
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
      email: req.user.email
    });
  }
);
module.exports = router;
