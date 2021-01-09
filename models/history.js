const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Constants = require("../constants");
const actionEnum = [
  Constants.create,
  Constants.deploy,
  Constants.deploy,
  Constants.win,
];

const historySchema = new Schema(
  {
    action: {
      type: String,
      enum: actionEnum,
      required: true,
    },
    gameId: {
      type: Schema.ObjectId,
      ref: "Game",
      required: true,
    },
    payload: {
      row: { type: Number },
      column: { type: Number },
      isVertical: { type: Boolean },
      ship: {type: String}
    },
    date: { type: Date, required: true },
  },
  {
    versionKey: false,
  }
);

const History = mongoose.model("history", historySchema);

module.exports = History;
