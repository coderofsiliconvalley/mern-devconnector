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

// @route   POST api/posts/like/:id
// @desc    Like a post
// @access  Private
// @note		User can like their own posts and all users can only like a post once
router.post("/like/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then(profile => {
		Post.findById(req.params.id)
			.then(post => {
				console.log("checking for previous likes");
				if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
					return res.status(400).json({ alreadyliked: "User already liked this post" });
				}

				// Add user to likes array of post and save to DB
				post.likes.unshift({ user: req.user.id });
				post.save().then(newPost => {
					res.json(newPost);
				});
			})
			.catch(err => res.status(404).json({ postnotfound: "No post found" }));
	});
});

// @route   POST api/posts/unlike/:id
// @desc    UNlike a post
// @access  Private
// @note		User can like their own posts and all users can only like a post once
router.post("/unlike/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then(profile => {
		Post.findById(req.params.id)
			.then(post => {
				console.log("checking for previous likes");
				if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
					return res.status(400).json({ notliked: "You have liked this post yet" });
				}

				// Get remove index from an Array of just the user ids
				removeIndex = post.likes.map(item => item.user.toString).indexOf(req.user.id);
				// Splice out of the array
				post.likes.splice(removeIndex, 1);

				// Save
				post.save().then(post => res.json(post));
			})
			.catch(err => res.status(404).json({ postnotfound: "No post found" }));
	});
});

// @route   POST api/posts/comment/:id
// @desc    Add comment to a post
// @access  Private
router.post("/comment/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
	// Validation
	const { errors, isValid } = validatePostInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	Post.findById(req.params.id)
		.then(post => {
			const newComment = {
				text: req.body.text,
				name: req.body.name,
				avatar: req.body.avatar,
				user: req.user.id
			};

			// Add to comments array to front of array
			post.comments.unshift(newComment);

			// Save
			post.save().then(post => res.json(post));
		})
		.catch(err => res.status(404).json({ nopostfound: "No post found" }));
});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment from a post
// @access  Private
router.delete("/comment/:id/:comment_id", passport.authenticate("jwt", { session: false }), (req, res) => {
	// Find post by id
	Post.findById(req.params.id)
		.then(post => {
			//Check if post exists
			if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
				return res.status(404).json({ commentdoesnotexist: "Comment does not exist" });
			}

			// Get remove index
			const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);

			// Remove comment from array
			post.comments.splice(removeIndex, 1);

			// Save
			post.save().then(post => res.json(post));
		})
		.catch(err => res.status(404).json({ nopostfound: "No post found" }));
});

// @route   POST api/posts
// @desc    Tests posts route
// @access  Private
router.get("/test", (req, res) => res.json({ msg: "posts works" }));

module.exports = router;
