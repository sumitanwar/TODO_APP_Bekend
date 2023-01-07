const express = require("express");
const router = express.Router();
const userColl = require("../models/registerSchema");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  let user = await userColl.findOne({ email });
  if (user) {
    return res
      .status(403)
      .json({ status: "failed", message: "User already Exist" });
  }
  try {
    user = await userColl.create(req.body);
    res.status(200).json({
      status: "Success",
      message: "Registration Successfull",
      user: user,
    });
  } catch (e) {
    res.status(400).json({ status: "failed", message: e.message });
  }
});
router.delete("/:id", async (req, res) => {
  let user = await userColl.deleteOne(req.params.id);
  try {
    res.status(200).json({
      status: "Deleted Successfully",
      user: user,
    });
  } catch (e) {
    res.status(400).json({ status: "failed", message: e.message });
  }
});
module.exports = router;
