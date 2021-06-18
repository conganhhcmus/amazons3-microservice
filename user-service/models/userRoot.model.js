const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rootUserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  iamUsers: [{ type: mongoose.ObjectId, ref: "IAMUser" }],
  publicToken: String,
  privateToken: String,
});

const RootUser = mongoose.model("RootUser", rootUserSchema, "root-users");
module.exports = RootUser;
