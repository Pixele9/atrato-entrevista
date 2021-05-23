const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

app.post("/newTask", (req, res) => {
  console.log("Data: ", req.body)
})

app.listen(5000, () => {
  console.log(`Server started on port ${PORT}`);
});
