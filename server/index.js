const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { pool } = require("./pool-config");

const port = process.env.SERVER_PORT || 5536;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (request, response) => {
  response.json({
    info: "Hello, World!",
  });
});

app.get("/users/", (request, response) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

app.post("/users", (request, response) => {
  var data = request.body
  pool.query("INSERT INTO users (email, password, firstName, lastName, ) VALUES ()")
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
