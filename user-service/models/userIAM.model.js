const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PERMISSION = require("../constants/permission");

const iamUserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  permission: { type: Number, default: PERMISSION.NO_ACCESS },
  owner: { type: mongoose.ObjectId },

  publicToken: String,
  privateToken: String,
});

const IAMUser = mongoose.model("IAMUser", iamUserSchema, "iam-users");
module.exports = IAMUser;
