const router = require("express").Router();
const { User, Profile } = require("../../models/index");
const passport = require("passport");
const chalk = require("chalk");
const ValidateProfileInput = require("../../validation/profile");
//logged in user will be able to create/update profile
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user._id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubUserName)
      profileFields.githubUserName = req.body.githubUserName;

    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    profileFields.social = {};

    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedIn) profileFields.social.linkedIn = req.body.linkedIn;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user._id })
      .then(profile => {
        if (profile) {
          Profile.findOneAndUpdate(
            { user: req.user._id },
            { $set: profileFields },
            { new: true }
          )
            .then(profile => res.json(profile))
            .catch(err =>
              console.log(chalk.red("Err at findByIdAndUpdate profile ", err))
            );
        } else {
          //check if handle exists
          Profile.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
              error.handle = "That handle already exists";
              res.status(400).json(errors);
            }
            new Profile(profileFields)
              .save()
              .then(profile => res.json(profile));
          });
        }
      })
      .catch(err =>
        console.log(chalk.red("Err at creating/updating profile ", err))
      );
  }
);

// get current user profile
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    console.log(chalk.grey(" ", req.user));
    Profile.findOne({ user: req.user._id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There's no profile for this user.";
          return res.status(404).json(errors);
        }
        return res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);
module.exports = router;
