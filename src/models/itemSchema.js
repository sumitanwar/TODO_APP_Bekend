const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const ItemSchema = new Schema({
  user: { type: ObjectId, ref: "userColl" },
  Activity: { type: String, required: true, unique: true },
  Status: { type: String, required: true },
  Time_Taken: { type: Date },
  Action: { type: String, required: true },
});
const ItemColl = mongoose.model("ItemColl", ItemSchema);
module.exports = ItemColl;
