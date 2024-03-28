import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 4000;

const todos = [];

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello world2");
});

app.post("/todos", (req, res) => {
  const data = req.body;
  todos.push(data);

  console.log("in todos array: ", todos);

  res.send("Post data received: " + JSON.stringify(data));
});

// Route för att skriva över en todo
app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    if (todo.id == id) {
      todos[i] = data;
    }
  }

  console.log("in todos array: ", todos);

  res.send("done");
});

app.listen(PORT, () => {
  console.log("Started on port: " + PORT);
});
