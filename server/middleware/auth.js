const jwt = require('jsonwebtoken');
const db = require("../db");

const Auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['Authentication'];
    if(!token) {
      return res.status(400).send({ 'message': 'Token is not provided' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM accounts WHERE id = $1 AND email = $2';
      const { rows } = await db.query(text, [decoded.userId, decoded.userEmail]);
      if(!rows[0]) {
        return res.status(400).send({ 'message': 'The token you provided is invalid' });
      }
      req.account = { id: decoded.userId };
      next();
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

module.exports = {
  Auth
}