const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
const PostSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: "users" },
	text: { type: String, required: true },
	// Save user info, in case associated user account is deleted
	name: { type: String }, //, required: true
	avatar: { type: String }, //, required: true
	like: [
		{
			user: { type: Schema.Types.ObjectId, ref: "users" }
		}
	],
	comments: [
		{
			user: { type: Schema.Types.ObjectId, ref: "users" },
			text: { type: String, require: true },
			// Save user info, in case associated user account is deleted
			name: { type: String }, //, required: true
			avatar: { type: String }, //, required: true
			// Date of comment
			date: { type: Date, default: Date.now }
		}
	],
	// Date of post
	date: { type: Date, default: Date.now }
});

module.exports = Post = mongoose.model("post", PostSchema);
