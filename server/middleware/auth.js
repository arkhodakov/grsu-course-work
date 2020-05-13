const jwt = require("jsonwebtoken");
const db = require("../db");

const verifyToken = async (req, res, next) => {
  const token = req.headers["authentication"];
  if (!token) {
    return res.status(400).send({ message: "Token is not provided" });
  }
  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    const text = "SELECT * FROM accounts WHERE id = $1";
    const { rows } = await db.pool.query(text, [decoded.userId]);
    if (!rows[0]) {
      return res
        .status(400)
        .send({ message: "The token you provided is invalid" });
    }
    req.account = { id: decoded.userId };
    next();
  } catch (error) {
    return res.status(400).send({message: "Unauthorized access"});
  }
};

module.exports = {
  verifyToken,
};
