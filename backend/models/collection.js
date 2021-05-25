const mongoose = require("mongoose");

const Collection = new mongoose.Schema({
	name: { type: String },
	description: { type: String }
})

module.exports = mongoose.model("Collection", Collection);