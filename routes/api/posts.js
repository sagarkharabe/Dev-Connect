const router = require("express").Router();
const { Post, Profile } = require("../../models");
const passport = require("passport");
const chalk = require("chalk");
const ValidatePostInput = require("../../validation/post");

//fetch all the post for guest all logged in suer
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      if (!posts) return res.status(404).json({ post: "No Posts Found!" });
      res.json(posts);
    })
    .catch(err => {
      console.log(chalk.red("Error at fetching all the post ", err));
      return res.status(400).json({ post: "Error while fetching posts." });
    });
});
//fetch one post got guest or a logged in user
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ post: "Post not Found !" }));
});

//logged in users can create a post
router.post(
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

//logged in users can delete their posts
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if (post.user.toString() != req.user._id) {
              return res.status(401).json({
                NotAuthorized: "User not Authorized"
              });
            }
            post.remove().then(() => res.json({ success: true }));
          })
          .catch(err => {
            console.log(chalk.red("Error at deleting a post -- ", err));
            return res
              .status(404)
              .json({ post: "Error while deleting the post." });
          });
      })
      .catch(err => {
        console.log(chalk.red("Error at finding user profile -- ", err));
        return res.status(404).json({ post: "Error at finding user profile " });
      });
  }
);

module.exports = router;
