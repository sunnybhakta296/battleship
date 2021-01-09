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
  },
  async deploy(req, res, next) {
    try {
      const { row, column, ship } = req.body;
      if (!row || !column || !ship) {
        //todo return specific missing field
        return next(new Error(`one or more required fields missing`));
      }
      const game = await battleship.deploy(req.params.gameId, req.body);
      res.json(game);
    } catch (error) {
      error.status = 400;
      next(error);
    }
  },
  async attack(req, res, next) {
    try {
      const { row, column } = req.body;
      if (!row || !column) {
        //todo return specific missing field
        return next(new Error(`one or more required fields missing`));
      }

      const message = await battleship.attack(req.params.gameId, req.body);
      res.json({ message });
    } catch (error) {
      error.status = 400;
      next(error);
    }
  },
  async status(req, res, next) {
    try {
      const game = await battleship.getGameInfo(req.params.gameId);
      return res.json(game);
    } catch (error) {
      error.status = 400;
      next(error);
    }
  },
};