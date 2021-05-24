const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Todo = require("./models/todo");

const PORT = 5000;

mongoose.connect("mongodb://127.0.0.1:27017/todos", { useNewUrlParser: true });

mongoose.connection.once("open", () => {
  console.log("Mongodb connection established succesfully")
})

app.use(express.json());

app.get("/", (req, res) => {
  Todo.find((err, todos) => {
    if(err) console.log("ERROR: ", err)
    else res.json(todos)
  })
})

app.post("/create", (req, res) => {
  const todo = new Todo(req.body);
  todo.save()
    .then((todo) => {
      res.json(todo);
    })
    .catch(err => {
      console.log(err.message);
    })
})

app.get("/:id", (req, res) => {
  const id = req.params.id;
  Todo.findById(id, (err, todo) => {
    res.json(todo)
  })
})

app.post("/newTask", (req, res) => {
  console.log("Data: ", req.body)
})

app.listen(5000, () => {
  console.log(`Server started on port ${PORT}`);
});
