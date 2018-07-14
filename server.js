const express = require("express");
const path = require("path");
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

// React App - Static Files from public directory
//app.use(express.static("public"));

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
	.catch(err => console.log("MongoDB CONNECTION ERROR: \n --------- \n %s \n ---------", err));

//
// ROUTES
//
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.get("/api/*", (req, res) => res.status(404).json({ noapi: "Not a valid API endpoint" }));

// Service static assets if in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

/// OLD
// Serve Static File for all other unknown routes

// app.get("*", (req, res) => {
// 	res.sendFile(path.join(__dirname + "/public/index.html"));

// 	// The old 404: File Not Found notice.
// 	//res.status(404).json({ msg: "Page Not Found" });
// });

//
// START APP
//
const port = process.env.port || 5000;
app.listen(port, () => console.log("Server running on port: ", port));
