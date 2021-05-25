const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const ObjectID = require('mongodb').ObjectID;
const morgan = require("morgan");

const Models = require("./models/todo");
// const Collection = require("./models/collection");

const PORT = 5000;

app.use(morgan("tiny"));
app.use(cors())
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/todos", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

mongoose.connection.once("open", () => {
  console.log("Mongodb connection established succesfully")
})

app.get("/collections", async (req, res) => {
  const collections = await Models.Collection.find({})
  res.json(collections)
  // Collection.find({}, (err, collections) => {
  //   if(err) console.log("ERROR: ", err)
  //   else res.json(collections)
  // })
})

// Fetch all tasks from a collection
app.get("/:id", (req, res) => {
  const id = req.params.id
  Models.Todo.find({ category: id }, (err, todos) => {
    if(err) console.log("ERROR: ", err)
    else res.json({ todos, count: todos.length })
  })
})

app.post("/create", (req, res) => {
  const todo = new Models.Todo(req.body);
  todo.save()
    .then((todo) => {
      res.json(todo);
    })
    .catch(err => {
      console.log(err.message);
    })
})

//default app.get("/:id", (req, res) => {
//   const id = req.params.id;
//   Models.Todo.findById(id, (err, todo) => {
//     res.json(todo)
//   })
// })

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  Models.Todo.deleteOne({ _id: ObjectID(id) }, (err) => {
    if(err) console.log("Error deleting task: ", err)
    else console.log("Succesfull detetion")
  })
})

// // COLLECTIONS
// app.get("/collections", async (req, res) => {
//   // const collections = await Collection.find({})
//   // console.log(collections)
//   // res.json(collections)
//   Collection.find((err, collections) => {
//     if(err) console.log("ERROR: ", err)
//     else res.json({ collections, count: collections.length })
//   })
// })

app.post("/newCollection", (req, res) => {
  const collection = new Collection(req.body);
  collection.save()
    .then(collection => {
      res.json(collection)
    })
    .catch(err => {
      console.log("Error saving collection: ", err)
    })
})

app.listen(5000, () => {
  console.log(`Server started on port ${PORT}`);
});
