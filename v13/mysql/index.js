import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2/promise";

const app = express();
const port = 3001;

// middleware
app.use(bodyParser.json());

// connect to DB
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bank",
  port: 8889,
});

// help function to make code look nicer
async function query(sql, params) {
  const results = await pool.execute(sql, params);
  return results;
}

// routes/endpoints
app.post("/users", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, password]
    );

    res.status(201).send("User created");
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).send("Error creating user");
  }
});

app.listen(port, () => {
  console.log("Listening on port: " + port);
});
