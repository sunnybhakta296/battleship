const battleship = require("../repositories/battleship");

module.exports = {
  async createGame(req, res, next) {
    try {
      const game = await battleship.createGame();
      return res.json(game);
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
};