const express = require("express");
const router = express.Router();
const itemColl = require("../models/itemSchema");
const bodyparser = require("body-parser");

router.use(bodyparser.json());
router.post("/", async (req, res) => {
  try {
    let items = await itemColl.create(req.body);
    res.status(200).json({
      status: "Success",
      message: "List Added Successfully",
      items: items,
    });
  } catch (e) {
    res.status(400).json({ status: "failed", message: e.message });
  }
});
router.get("/", async (req, res) => {
  try {
    let items = await itemColl.find();
    res.status(200).json({
      status: "Success",
      message: "Items Found Successfully",
      items: items,
    });
  } catch (e) {
    res.status(400).json({ status: "failed", message: e.message });
  }
});
router.put("/:id", async (req, res) => {
  const { Activity, Status, Time_Taken, Action } = req.body;
  let updatedItems;
  if (Activity || Status || Time_Taken || Action) {
    updatedItems = await itemColl.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
  }
  try {
    res.status(200).json({
      status: "Success",
      message: "Items Updated Successfully",
      updatedItems,
    });
  } catch (e) {
    res.status(400).json({ status: "failed", message: e.message });
  }
});
router.delete("/:id", async (req, res) => {
  let Item = await itemColl.deleteOne({ _id: req.params.id });
  try {
    res.status(200).json({
      status: "Item Deleted Successfully",
      Item: Item,
    });
  } catch (e) {
    res.status(400).json({ status: "failed", message: e.message });
  }
});
module.exports = router;
