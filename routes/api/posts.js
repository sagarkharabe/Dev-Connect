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
        console.log(chalk.red("Error at deleting the post -- ", err));
        return res.status(404).json({ post: "Error at deleting the post " });
      });
  }
);

// logged in users can like a post
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if (
              post.likes.filter(like => like.user.toString() == req.user._id)
                .length > 0
            )
              return res
                .status(400)
                .json({ alreadyLiked: "User already liked this post" });

            post.likes.unshift({ user: req.user._id });
            post
              .save()
              .then(post => res.json(post))
              .catch(err => {
                console.log(chalk.red("error at liking a post -- ", err));
                res.status(400).json({ error: "Error while saving the like" });
              });
          })
          .catch(err => {
            console.log(chalk.red("Error at liking a post -- ", err));
            return res
              .status(404)
              .json({ error: "Error while liking the post." });
          });
      })
      .catch(err => {
        console.log(chalk.red("Error while liking a post -- ", err));
        return res.status(404).json({ error: "Error while liking a post " });
      });
  }
);
//logged in users can unlike a posts
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            console.log(
              "Has user liked it -- ",
              post.likes.filter(like => like.user.toString() == req.user._id)
                .length
            );
            if (
              post.likes.filter(like => like.user.toString() == req.user.id)
                .length === 0
            )
              return res
                .status(400)
                .json({ alreadyLiked: "User hasn't liked the post yet." });

            const removeIndex = post.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);

            post.likes.splice(removeIndex, 1);
            post
              .save()
              .then(post => res.json(post))
              .catch(err => {
                console.log(chalk.red("error at unliking a post -- ", err));
                res
                  .status(400)
                  .json({ error: "Error while saving the unlike" });
              });
          })
          .catch(err => {
            console.log(chalk.red("Error at unliking a post -- ", err));
            return res
              .status(404)
              .json({ error: "Error while unliking the post." });
          });
      })
      .catch(err => {
        console.log(chalk.red("Error while unliking a post -- ", err));
        return res.status(404).json({ error: "Error while unliking a post " });
      });
  }
);

//logged in users can comment on post

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user._id
        };
        post.comments.unshift(newComment);
        post
          .save()
          .then(post => res.json(post))
          .catch(err => {
            console.log(chalk.red("Error at saving the comment ", err));
            return res
              .status(400)
              .json({ error: "Error at saving your comment" });
          });
      })
      .catch(err => {
        console.log(chalk.red("Error at the comment route -- ", err));
        return res.status(400).json({ error: "Error at saving your comment" });
      });
  }
);

//logged in users can delete any of their comment on any post

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        console.log(
          "Has comment  -- ",
          post.comments.filter(
            comment => comment._id.toString() == req.params.comment_id
          ).length
        );
        if (
          post.comments.filter(
            comment => comment._id.toString() == req.params.comment_id
          ).length === 0
        )
          return res
            .status(400)
            .json({ commentnotexists: "There is no comment with id" });

        const removeIndex = post.comments
          .map(comment => comment._id.toString())
          .indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);

        post
          .save()
          .then(post => res.json(post))
          .catch(err => {
            console.log(
              chalk.red("Error at saving the delete the comment ", err)
            );
            return res
              .status(400)
              .json({ error: "Error at saving your changes" });
          });
      })
      .catch(err => {
        console.log(chalk.red("Error at the comment delete route -- ", err));
        return res.status(400).json({ error: "Error at saving your changes" });
      });
  }
);

module.exports = router;
