const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const Todo = require("./models/todo");

const PORT = 5000;

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/todos", { useNewUrlParser: true });

mongoose.connection.once("open", () => {
  console.log("Mongodb connection established succesfully")
})

app.use(express.json());

app.get("/", (req, res) => {
  Todo.find((err, todos) => {
    if(err) console.log("Andres ERROR: ", err)
    else res.json( { todos, count: todos.length })
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

app.listen(5000, () => {
  console.log(`Server started on port ${PORT}`);
});
