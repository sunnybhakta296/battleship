const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Constants = require("../constants");
const actionEnum = [Constants.create, Constants.deploy, Constants.attack];
const resultEnum = [
  Constants.win,
  Constants.hit,
  Constants.miss,
  Constants.sank,
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
      ship: { type: String },
    },
    result: {
      type: String,
      enum: resultEnum,
    },
    date: { type: Date, required: true },
  },
  {
    versionKey: false,
  }
);

const History = mongoose.model("history", historySchema);

module.exports = History;
