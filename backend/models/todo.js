const mongoose = require("mongoose");

const Todo = mongoose.Schema({
	title: { type: String },
	description: { type: String },
	done: { type: Boolean, default: false }
})

module.exports = mongoose.model("Todo", Todo);