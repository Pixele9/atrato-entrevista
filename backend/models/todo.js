const mongoose = require("mongoose");

const Todo = mongoose.Schema({
	title: { type: String },
	description: { type: String },
})

module.exports = mongoose.model("Todo", Todo);