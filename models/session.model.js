const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      required: true,
    },
    messages: {
      type: [],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const session = mongoose.model("Session", sessionSchema);
module.exports = session;
