const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

// -- Models -- //
const account = require("./models/account");
const users = require("./models/users");
const projects = require("./models/projects");
const issues = require("./models/issues");

// -- Middleware -- //
const authentication = require("./middleware/auth");

const port = process.env.SERVER_PORT || 5536;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/api/v1/", (req, res) => {
  return res.status(200).json({
    message: "Everything is OK!",
  });
});

// -- API: Account Management -- //
app.post("/api/v1/account/login", account.login);
app.post("/api/v1/account/signup", account.create);
app.post("/api/v1/account/delete",  authentication.verifyToken, account.remove);

app.get("/api/v1/users",  authentication.verifyToken, users.list);

app.get("/api/v1/issues", authentication.verifyToken, issues.list);
app.post("/api/v1/issues", authentication.verifyToken, issues.create);
app.put("/api/v1/issues",  authentication.verifyToken, issues.update);

app.get("/api/v1/projects",  authentication.verifyToken, projects.list);

app.listen(port, "0.0.0.0", () => {
  console.log(`Listening on port ${port}`);
});