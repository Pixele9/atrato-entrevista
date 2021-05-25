const mongoose = require("mongoose");

const Todo = mongoose.Schema({
	title: { type: String },
	description: { type: String },
	done: { type: Boolean, default: false },
	category: { type: String }
})

const Collection = new mongoose.Schema({
	name: { type: String },
	description: { type: String },
})

const CollectionModel = mongoose.model("Collection", Collection);
const TodoModel = mongoose.model("Todo", Todo);

// module.exports = mongoose.model("Todo", Todo);
module.exports = {
	"Collection": CollectionModel,
	"Todo": TodoModel
}