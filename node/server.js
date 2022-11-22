// express server

const express = require("express");

const app = express();

const Pool = require("pg").Pool

const pool = new Pool({
  host: "db",
  port: 5432,
  database: "mydb",
  user: "postgres",
  password: "123456",
}).on("connection", () => {
    console.log("connected to the db");
})

pool.query("CREATE TABLE IF NOT EXISTS people (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL);", (res) => {
  console.log(res);
})

app.use(express.json());

app.get("/", (req, res) => {
  pool.query("INSERT INTO people (name) VALUES ($1)", ["John Doe"], (err, values) => {
    pool.query("SELECT * FROM people", (err, result) => {
      console.log('Result from select: ', result)
      res.send(`
          <h1>Hello Full Cycle</h1>
          ${result.rows.map((item) => `<p>${item.name}</p>`).join("")}
      `);
    })
  })
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});