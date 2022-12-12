const { Schema, model } = require("mongoose");

const UserModel = new Schema({
  //User ID
  discordId: {
    type: String,
    required: true,
    unique: true,
  },

  warns: Array, // Added warns from servers
  blacklisted: { default: false, type: Boolean }, // Can use bot?
  rules_accepted: { default: false, type: Boolean }, //DB E-mail confirmed
  email: { default: null, type: String }, // Email for confirmation
  usrname: { default: null, type: String },
  requireVote: {
    isVotedNow: {
      default: false,
      type: Boolean,
    },
    lastVoted: {
      default: null,
      type: String,
    },
  },
});

module.exports = model("User_DB", UserModel); // Exporting module
