const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db");

const passwordHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

const passwordCompareHashes = (hashPassword, password) => {
  return bcrypt.compareSync(password, hashPassword);
};

const emailValidate = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

const tokenGenerate = (id, email) => {
  const token = jwt.sign(
    {
      userId: id,
      userEmail: email,
    },
    process.env.SECRET,
    { expiresIn: "7d" }
  );
  return token;
};

const tokenAccount = (token) => {
  const decoded = jwt.verify(token, process.env.SECRET);
  return {
    id: decoded.userId,
    email: decoded.userEmail
  }
}

module.exports = {
  passwordHash,
  passwordCompareHashes,
  emailValidate,
  tokenGenerate,
  tokenAccount
};
