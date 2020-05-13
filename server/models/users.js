const helper = require("../helper");
const db = require("../db");

const list = async (req, res) => {
  const query = `SELECT id, name, email FROM accounts;`;

  try {
    const { rows } = await db.pool.query(query);
    return res.status(200).send({ users: rows });
  } catch (error) {
    return res.status(500).send(error);
  }
};


module.exports = {
    list,
}