const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

// -- Models -- //
const account = require("./models/account");

// -- Middleware -- //
const Authentication = require("./middleware/auth");

const port = process.env.SERVER_PORT || 5536;
const app = express();

app.use(cors());
app.use(express.json())
app.use(bodyParser.json());

app.get("/api/v1/", (req, res) => {
  return res.status(200).json({
    message: "Everything is OK!",
  });
});

// -- API: Account Management -- //
app.post("/api/v1/account/login", account.login);
app.post("/api/v1/account/signup", account.create);
app.post("/api/v1/account/delete", (req, res) => account.remove(req, res));

app.listen(port, '127.0.0.1', () => {
  console.log(`Listening on port ${port}`);
});
