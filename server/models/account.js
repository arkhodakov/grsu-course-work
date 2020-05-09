const helper = require("../helper");
const db = require("../db");

const create = async (req, res) => {
  if (!req.body.email || !req.body.name || !req.body.password) {
    return res.status(400).send({ message: "Some values are missing" });
  }

  if (!helper.emailValidate(req.body.email)) {
    return res.status(400).send({ message: "Email has incorrect format!" });
  }

  const query = `INSERT INTO
      accounts(email, name, password)
      VALUES($1, $2, $3)
      returning *`;
  const values = [
    req.body.email,
    req.body.name,
    helper.passwordHash(req.body.password),
  ];

  try {
    const { rows } = await db.pool.query(query, values);
    const token = helper.tokenGenerate(rows[0].id, req.body.email);
    return res.status(201).send({ token: token, name: req.body.name });
  } catch (error) {
    if (error.routine === "_bt_check_unique") {
      return res
        .status(400)
        .send({ message: "User with that credentials already exist" });
    }
    return res.status(400).send(error);
  }
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Some values are missing" });
  }

  if (!helper.emailValidate(req.body.email)) {
    return res
      .status(400)
      .send({ message: "Please enter a valid email address" });
  }

  const query = "SELECT * FROM accounts WHERE email=$1";
  const values = [req.body.email];
  try {
    const { rows } = await db.pool.query(query, values);
    if (!rows[0]) {
      return res
        .status(400)
        .send({ message: "The credentials you provided is incorrect" });
    }

    if (!helper.passwordCompareHashes(rows[0].password, req.body.password)) {
      return res
        .status(400)
        .send({ message: "The credentials you provided is incorrect" });
    }

    const token = helper.tokenGenerate(rows[0].id);
    return res.status(200).send({
      token: token,
      name: rows[0].name,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  const deleteQuery = "DELETE FROM accounts WHERE email=$1 returning *";
  try {
    const { rows } = await db.query(deleteQuery, [req.user.email]);
    if (!rows[0]) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({ message: "Deleted" });
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  login,
  create,
  remove,
};
