const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: "User name is required."
  }
});

const Users = mongoose.model("User", UserSchema);

module.exports = Users;
