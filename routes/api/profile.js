const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");

// @route   GET api/profile
// @desc    Get Current user's profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const userId = req.user.id;

    Profile.findOne({ user: userId })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }

        return res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   PUT api/profile
// @desc    CREATE or EDIT user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Validation
    // Get User Profile fields
    const profileFields = {};
    profileFields.user = req.user.id; // Passed in via Passport jwt auth

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;

    // Split comma delimited string into an array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    if (req.bio) profileFields.bio = req.body.bio;

    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    // Handle social objects in Profile model
    profileFields.social = {};

    if (req.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.instagram) profileFields.social.instagram = req.body.instagram;

    // Experience AND Eductation properties handled by dedicated endpoints/separate form on front-end

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // Update
          profile
            .findOneAndUpdate(
              { user: req.user.id },
              { $set: profileFields },
              { new: true }
            )
            .then(profile => res.json(profile));
        } else {
          // Check if handle exists - gotta be unique
          profile.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
              erros.handle = "That handle already exists";
              res.status(400).json(errors);
            }
          });

          // Create new profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        }
      })
      .catch();
  }
);

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "profile works" }));

module.exports = router;
