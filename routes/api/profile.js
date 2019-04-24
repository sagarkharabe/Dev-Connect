const router = require("express").Router();
const { User, Profile } = require("../../models/index");
const passport = require("passport");
const chalk = require("chalk");
const ValidateProfileInput = require("../../validation/profile");
const ValidateExperienceInput = require("../../validation/experience");
const ValidateEducationInput = require("../../validation/education");
//fetch all profiles for guest or logged in user
router.get("/all", (req, res) => {
  let errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      return res.json(profiles);
    })
    .catch(err => {
      console.log(chalk.red("Error at Fetching all profiles ", err));
      return res.status(404).json({ profile: "There are no profiles" });
    });
});

//get profile by handle
router.get("/handle/:handle", (req, res) => {
  let errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this handle.";
        return res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch(err => {
      console.log(chalk.red("Error at fetching profile using handle ---", err));
      return res
        .status(404)
        .json({ profile: "There is no profile for the user." });
    });
});

//fetch profile by user_id
router.get("/user/:user_id", (req, res) => {
  let errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this handle.";
        return res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch(err => {
      console.log(chalk.red("Error at fetching profile using handle ---", err));
      return res
        .status(404)
        .json({ profile: "There is no profile for the user." });
    });
});

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

//logged in user can add an experince
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateExperienceInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    Profile.findOne({ user: req.user._id })
      .then(profile => {
        if (!profile)
          return res
            .status(404)
            .json({ noprofile: "There is no profile for this user." });
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        profile.experience.unshift(newExp);
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => {
            console.log(chalk.red("Error at saving experiece -- ", err));
            return res.status(400).json({
              experience: "Error occured while saving your experience."
            });
          });
      })
      .catch(err => {
        console.log(chalk.red("Error at posting experience. ", err));
        return res
          .status(400)
          .json({ experience: "Error at posting to experience route" });
      });
  }
);

//logged in user can add an education
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateEducationInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    Profile.findOne({ user: req.user._id })
      .then(profile => {
        if (!profile)
          return res
            .status(404)
            .json({ noprofile: "There is no profile for this user." });
        const newEdu = {
          school: req.body.school,
          degree: req.body.degree,
          fieldOfStudy: req.body.fieldOfStudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        profile.education.unshift(newEdu);
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => {
            console.log(chalk.red("Error at saving education -- ", err));
            return res.status(400).json({
              experience: "Error occured while saving your education."
            });
          });
      })
      .catch(err => {
        console.log(chalk.red("Error at posting education. ", err));
        return res
          .status(400)
          .json({ experience: "Error at posting to education route" });
      });
  }
);

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user._id })
      .then(profile => {
        if (!profile)
          return res
            .status(404)
            .json({ noprofile: "There is no profile for this user." });

        const removeIndex = profile.experience
          .map(item => item._id)
          .indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => {
            console.log(
              chalk.red(
                "Error at saving profile after deleting an experience -- ",
                err
              )
            );
            return res.status(400).json({
              deleteExp: "There was a error while deleting education."
            });
          });
      })
      .catch(err => {
        console.log(chalk.red("Error at deleting experience. ", err));
        return res
          .status(400)
          .json({ experience: "Error at deleting to experience route" });
      });
  }
);

// delete education
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user._id })
      .then(profile => {
        if (!profile)
          return res
            .status(404)
            .json({ noprofile: "There is no profile for this user." });

        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => {
            console.log(
              chalk.red(
                "Error at saving profile after deleting an education -- ",
                err
              )
            );
            return res.status(400).json({
              deleteEdu: "There was a error while deleting education."
            });
          });
      })
      .catch(err => {
        console.log(chalk.red("Error at deleting education. ", err));
        return res
          .status(400)
          .json({ education: "Error at deleting to education route" });
      });
  }
);

//delete profile and user as well
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user._id }).then(() => {
      User.findOneAndRemove({ _id: req.user._id }).then(() =>
        res.json({ success: true })
      );
    });
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
