const express = require("express");
const router = express.Router();
const userColl = require("../models/registerSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// console.log(process.env.secret);
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  let user = await userColl.findOne({ email });
  if (!user) {
    return res
      .status(403)
      .json({ status: "failed", message: "User Does Not Exist" });
  } else {
    if (user.password == password) {
    } else {
      return res
        .status(403)
        .json({ status: "failed", message: "incorrect Password" });
    }
  }
  try {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: user._id,
      },
      process.env.secret
    );
    res.status(200).json({
      status: "Success",
      message: "Login Successfull",
      user: user,
      token: token,
    });
  } catch (e) {
    res.status(400).json({ status: "failed", message: e.message });
  }
});
module.exports = router;
