const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  cpassword: { type: String },
});
const userColl = mongoose.model("userColl", userSchema);
module.exports = userColl;
