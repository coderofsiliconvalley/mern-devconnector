const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");

// Load Form Validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

// @route   GET api/profile
// @desc    Get Current user's profile
// @access  Private
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
	const errors = {};
	const userId = req.user.id;

	Profile.findOne({ user: userId })
		.populate("user", ["name", "avatar"])
		.then(profile => {
			if (!profile) {
				errors.noprofile = "There is no profile for this user";
				return res.status(404).json(errors);
			}

			return res.json(profile);
		})
		.catch(err => res.status(404).json(err));
});

// @route   GET api/profile/all
// @desc    Get all user profiles
// @access  Public
router.get("/all", (req, res) => {
	const errors = {};

	Profile.find()
		.populate("user", ["name", "avatar"])
		.then(profiles => {
			if (!profiles) {
				errors.noprofile = "There are no profiles yet.";
				return res.status(404).json(errors);
			}

			res.json(profiles);
		})
		.catch(err => res.status(404).json({ noprofile: "There are no profiles yet." }));
});

// @route   GET api/profile/handle/:handle
// @desc    Get user profile by handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
	const errors = {};

	Profile.findOne({ handle: req.params.handle })
		.populate("user", ["name", "avatar"])
		.then(profile => {
			if (!profile) {
				errors.noprofile = "No profile for this handle";
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch(err => res.status(404).json({ err }));
});

// @route   GET api/profile/user/:user_id
// @desc    Get user by user id
// @access  Public
router.get("/user/:user_id", (req, res) => {
	const errors = {};

	Profile.findOne({ user: req.params.user_id })
		.populate("user", ["name", "avatar"])
		.then(profile => {
			if (!profile) {
				errors.noprofile = "No profile for this user";
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch(err => res.status(404).json({ noprofile: "No profile for this user" }));
});

// @route   PUT api/profile
// @desc    CREATE or EDIT user profile
// @access  Private
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
	// Validation
	const { errors, isValid } = validateProfileInput(req.body);

	// Check for valid input
	if (!isValid) {
		return res.status(400).json(errors);
	}

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

	if (req.body.bio) profileFields.bio = req.body.bio;

	if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

	// Handle social objects in Profile model
	profileFields.social = {};

	if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
	if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
	if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
	if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
	if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

	// Experience AND Eductation properties handled by dedicated endpoints/separate form on front-end

	// See if a profile for this user already exists.
	// EXISTS: Update the existing profile in the DB
	// NEW: Create new profile in the DB
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			if (profile) {
				// Update
				Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true }).then(profile =>
					res.json(profile)
				);
			} else {
				// Check if handle exists - gotta be unique
				Profile.findOne({ handle: profileFields.handle }).then(profile => {
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
});

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post("/experience", passport.authenticate("jwt", { session: false }), (req, res) => {
	// Validation
	const { errors, isValid } = validateExperienceInput(req.body);

	// Check for valid input
	if (!isValid) {
		return res.status(400).json(errors);
	}

	// Find user profile
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			const newExperienceItem = {
				title: req.body.title,
				company: req.body.company,
				location: req.body.location,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description
			};

			// Add experience item to array
			profile.experience.unshift(newExperienceItem);

			profile.save().then(profile => res.json(profile));
		})
		.catch(err => res.status(404).json({ noprofile: "Profile not found" }));
});

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post("/education", passport.authenticate("jwt", { session: false }), (req, res) => {
	// Validation
	const { errors, isValid } = validateEducationInput(req.body);

	// Check for valid input
	if (!isValid) {
		return res.status(400).json(errors);
	}

	// Find user profile
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			const newEducationItem = {
				school: req.body.school,
				degree: req.body.degree,
				fieldofstudy: req.body.fieldofstudy,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description
			};

			// Add experience item to array
			profile.education.unshift(newEducationItem);

			profile.save().then(profile => res.json(profile));
		})
		.catch(err => res.status(404).json({ noprofile: "Profile not found" }));
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete("/experience/:exp_id", passport.authenticate("jwt", { session: false }), (req, res) => {
	// Find user profile
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			// Get remove index
			const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

			// Splice from array
			profile.experience.splice(removeIndex, 1);

			// Save update profile
			profile.save().then(profile => res.json(profile));
		})
		.catch(err => res.status(404).json({ noprofile: "Profile not found" }));
});

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete experience from profile
// @access  Private
router.delete("/education/:edu_id", passport.authenticate("jwt", { session: false }), (req, res) => {
	// Find user profile
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			// Get remove index
			const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

			// Splice from array
			profile.education.splice(removeIndex, 1);

			// Save update profile
			profile.save().then(profile => res.json(profile));
		})
		.catch(err => res.status(404).json({ noprofile: "Profile not found" }));
});

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete("/", passport.authenticate("jwt", { session: false }), (req, res) => {
	Profile.findOneAndRemove({ user: req.user.id }).then(() => {
		User.findOneAndRemove({ _id: req.user.id }).then(() => {
			res.json({ success: true });
		});
	});
});

module.exports = router;
