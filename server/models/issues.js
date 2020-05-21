const helper = require("../helper");
const db = require("../db");

const list = async (req, res) => {
  const query = `SELECT * FROM issues;`;

  try {
    const { rows } = await db.pool.query(query);
    return res.status(200).send({ issues: rows });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const create = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.content ||
    !req.body.priority ||
    !req.body.assignee ||
    !req.body.due_date
  ) {
    return res
      .status(400)
      .send({ message: "Some necessary parameters aren't specified" });
  }

  const token = req.headers["authentication"];
  const account = helper.tokenAccount(token);

  try {
    db.pool.connect(async (err, client, release) => {
      const { rows } = await client.query(
        `INSERT INTO issues(name, content, priority, status, creator, assignee, due_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      returning id`,
        [
          req.body.name,
          req.body.content,
          req.body.priority,
          "TO_DO",
          account.id,
          req.body.assignee,
          req.body.due_date,
        ]
      );

      await client.query(
        `INSERT
        INTO issues_list(project_id, issue_id)
        VALUES ($1, $2)
        returning *`,
        [req.body.project, rows[0].id]
      );

      release();

      return res.status(200).send({ id: rows[0].id });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const update = async (req, res) => {
  if (!req.body.id) {
    return res
      .status(400)
      .send({ message: "Some necessary parameters aren't specified" });
  }

  const query = `UPDATE issues
    SET name=$2, content=$3, priority=$4, status=$5, assignee=$6, due_date=$7
    WHERE id=$1
    returning *`;
  const values = [
    req.body.id,
    req.body.name,
    req.body.content,
    req.body.priority,
    req.body.status,
    req.body.assignee,
    req.body.due_date,
  ];

  try {
    const { rows } = await db.pool.query(query, values);
    return res.status(200).send({ issue: rows[0] });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  if (!req.body.id) {
    return res
      .status(400)
      .send({ message: "Some necessary parameters aren't specified" });
  }

  try {
    db.pool.connect((err, client, release) => {
      client.query(`DELETE FROM issues_list WHERE issue_id=$1 returning *`, [
        req.body.id,
      ]);

      client.query(`DELETE FROM issues WHERE id=$1 returning *`, [req.body.id]);

      release();

      return res.status(200).send();
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  list,
  create,
  update,
  remove,
};
