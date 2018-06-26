const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// API Routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

//
// MIDDLEWARE
//

// Passport Middleware
app.use(passport.initialize());

// Passport Config - JWT Strategy
require("./config/passport")(passport);

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//
// DB CONFIGURATION
//
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected."))
  .catch(err => console.log(err));

//
// ROUTES
//

app.get("/", (req, res) => res.send("hello, world."));

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//
// START APP
//
const port = process.env.port || 5000;
app.listen(port, () => console.log("Server running on port: ", port));
