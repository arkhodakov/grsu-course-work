const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const db = require("./db");

// -- Models -- //
const account = require("./models/account");
const users = require("./models/users");
const projects = require("./models/projects");
const issues = require("./models/issues");

// -- Middleware -- //
const authentication = require("./middleware/auth");

const port = process.env.SERVER_PORT || 5536;
const app = express();

console.log("ENV. Configuration:", process.env)

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const healthyCheck = async (res) => {
  try {
    const { rows } = await db.pool.query("SELECT 1 + 1 AS solution");

    return res.status(200).json({
      message: "Healthy check done. I'm okay. Dont worry.",
      payload: {
        database: true,
        message: rows,
      },
    });
  } catch (error) {
    return res.status(200).json({
      message: "Healthy check done. I'm okay. Dont worry.",
      payload: {
        database: false,
        error: error,
      },
    });
  }
};

app.get("/", async (req, res) => {
  return await healthyCheck(res);
});

app.get("/api/", async (req, res) => {
  return await healthyCheck(res);
});

// -- API: Account Management -- //
app.post("/api/account/login", account.login);
app.post("/api/account/signup", account.create);
app.post("/api/account/delete", authentication.verifyToken, account.remove);

app.get("/api/users", authentication.verifyToken, users.list);

app.get("/api/issues", authentication.verifyToken, issues.list);
app.post("/api/issues", authentication.verifyToken, issues.create);
app.put("/api/issues", authentication.verifyToken, issues.update);
app.delete("/api/issues", authentication.verifyToken, issues.remove)

app.get("/api/projects", authentication.verifyToken, projects.list);

app.get("*", (req, res) => {
  return res.status(404).send({
    message: "Unknown route",
  });
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

server.on("connection", function (client) {
  try {
    console.log(
      `[${new Date()}] Connected: ${client.remoteAddress}:${client.remotePort}`
    );
  } catch {
    console.log("Connection.");
  }
});
