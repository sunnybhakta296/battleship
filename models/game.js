const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    size: {
        type: Number,
        default: 10
    },    
    adjacentGrids: {
      type: Array,
      default: [],
    },
    occupiedGrids: {
      type: Array,
      default: [],
    },
    defender: {
      type: Object,
      default: {},
    },
    attacker: {
      type: Object,
      default: {},
    },
  },
  {
    versionKey: false,
  }
);

const Game = mongoose.model("game", gameSchema);

module.exports = Game;
