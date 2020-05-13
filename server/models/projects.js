const helper = require("../helper");
const db = require("../db");

const list = async (req, res) => {
  const query = `SELECT * FROM projects;`;

  try {
    const { rows } = await db.pool.query(query);
    return res.status(200).send({ projects: rows });
  } catch (error) {
    return res.status(500).send(error);
  }
};


module.exports = {
    list,
}
