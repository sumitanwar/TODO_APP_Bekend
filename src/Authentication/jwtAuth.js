const jwt = require("jsonwebtoken");
require("dotenv").config();

// verify a token symmetric
const authentiction = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(403)
      .json({ status: "Failed", message: "Token Missing/Invalid Token" });
  } else {
    try {
      jwt.verify(token, process.env.secret, function (err, decoded) {
        if (err) {
          return res.status(400).json({ status: "Failed", message: e.message });
        }
        req.user = decoded.data;
        next();
      });
    } catch (e) {
      res.status(403).json({ status: "Failed", message: e.message });
    }
  }
};

module.exports = authentiction;
