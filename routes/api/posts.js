const router = require("express").Router();
const { Post } = require("../../models");
const passport = require("passport");
const chalk = require("chalk");
const ValidatePostInput = require("../../validation/post");
//logged in users can create a post
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user._id
    });
    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => {
        console.log(chalk.red("Error at saving a post -- ", err));
        return res.status(400).json({ post: "Failed to save the post." });
      });
  }
);

module.exports = router;
