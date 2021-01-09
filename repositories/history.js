const History = require("../models/history");
const Constants = require("../constants");

module.exports = gameHistory = {
  save({ gameId, action, payload }) {
    if (
      ![
        Constants.create,
        Constants.deploy,
        Constants.attack,
        Constants.win,
      ].includes(action)
    ) {
      return false;
    }

    let options = {
      gameId,
      action,
      date: new Date(),
    };

    if (action === Constants.deploy) {
      options.payload = payload;
    }

    const history = new History(options);
    history.save();
  },
};
