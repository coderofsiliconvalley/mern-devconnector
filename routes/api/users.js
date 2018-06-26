const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

// Load user model
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "users works" }));

// @route   GET api/users/register
// @desc    Register a new user
// @access  Public
router.post("/register", (req, res) => {
  // Find if the user email already exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: 200, // Avatar Size,
        r: "pg", // Rating
        d: "mm" // Default Avatar image
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    User JWT Authentication
// @access  Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // User user by email
  User.findOne({ email }).then(user => {
    // Check for existing user
    if (!user) {
      return res.status(404).json({ email: "User not found." });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Return the JWT for successful auth
        return res.json({ msg: "User successfully logged in." });
      } else {
        return res.status(400).json({ msg: "Invalid password" });
      }
    });
  });
});

module.exports = router;
