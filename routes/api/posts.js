const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Post Model
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

// Validation
const validatePostInput = require("../../validation/post");

// @route   GET api/posts
// @desc    Get all the posts
// @access  Public
router.get("/", (req, res) => {
	Post.find()
		.sort({ date: -1 })
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:id", (req, res) => {
	Post.findById(req.params.id)
		.then(post => res.json(post))
		.catch(err => res.status(404).json({ nopostfound: "No post found with this ID" }));
});

// @route   POST api/posts
// @desc    Create a new post to the authenticated user
// @access  Private
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
	// Validation
	const { errors, isValid } = validatePostInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	// New Post
	const newPost = new Post({
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar,
		user: req.user.id // from passport authentication
	});

	newPost.save().then(post => res.json(post));
});

// @route   POST api/posts/:id
// @desc    Delete post from the authenticated user
// @access  Private
router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then(profile => {
		Post.findById(req.params.id)
			.then(post => {
				// Check post owner
				if (post.user.toString() !== req.user.id) {
					return res.status(401).json({ noauthorize: "User not authorized" });
				}

				// Delete
				post.remove().then(() => res.json({ success: true }));
			})
			.catch(err => res.status(404).json({ postnotfound: "No post found" }));
	});
});
// @route   POST api/posts
// @desc    Tests posts route
// @access  Private
router.get("/test", (req, res) => res.json({ msg: "posts works" }));

module.exports = router;
