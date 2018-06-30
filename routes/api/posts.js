const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Post Model
const Post = require("../../models/Post");

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
	// Validation

	// New Post
	const newPost = new Post({
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar,
		user: req.user.id // from passport authentication
	});

	newPost.save().then(post => res.json(post));
});
// @route   POST api/posts
// @desc    Tests posts route
// @access  Private
router.get("/test", (req, res) => res.json({ msg: "posts works" }));

module.exports = router;
