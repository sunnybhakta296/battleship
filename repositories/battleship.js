const _ = require("lodash");
const Game = require("../models/game");
const history = require("../repositories/history");
const Constants = require("../constants");

module.exports = battleship = {
  getGameInfo(gameId) {
    return Game.findOne({ gameId });
  },
  toGrid(row, column) {
    return 10 * (row - 1) + column;
  },
  isExceedGrids(row, column) {
    return column > 10 || row > 10 || column < 1 || row < 1;
  },
  getAdjacent(options) {
    let adj;
    if (options.isVertical) {
      adj = battleship.verticalAdjacent(options);
    } else {
      adj = battleship.horizontalAdjacent(options);
    }
    return adj;
  },
  horizontalAdjacent(options) {
    const count = options.ship.size + 2;
    let _col;
    let _row;
    let adj = [];
    for (let i = 0; i < 3; i++) {
      _row = options.row + i - 1;
      for (let j = 0; j < count; j++) {
        _col = options.column + j - 1;
        if (battleship.isExceedGrids(_row, _col)) {
          continue;
        }
        adj.push(battleship.toGrid(_row, _col));
      }
    }
    return adj;
  },
  verticalAdjacent(options) {
    const count = options.ship.size + 2;
    let _col;
    let _row;
    let adj = [];
    for (let i = 0; i < 3; i++) {
      _col = options.column + i - 1;
      for (let j = 0; j < count; j++) {
        _row = options.row + j - 1;
        if (battleship.isExceedGrids(_row, _col)) {
          continue;
        }
        adj.push(battleship.toGrid(_row, _col));
      }
    }
    return adj;
  },
  async createGame() {
    const game = new Game();
    (game.defender = {
      placements: [],
      ships: {
        battleship: {
          name: "battleship",
          amount: 1,
          size: 4,
        },
        cruiser: {
          name: "cruiser",
          amount: 2,
          size: 3,
        },
        destroyer: {
          name: "destroyer",
          amount: 3,
          size: 2,
        },
        submarine: {
          name: "submarine",
          amount: 4,
          size: 1,
        },
      },
    }),
      (game.attacker = {
        missGrids: [],
        hitGrids: [],
      });

    const gameInfo = await game.save();

    history.save({
      gameId: gameInfo._id,
      action: Constants.create,
    });

    return gameInfo;
  },
  async deploy(gameId, options) {
    const game = await Game.findOne({ _id: gameId });
    const row = options.row;
    const column = options.column;

    if (!game) {
      return Promise.reject(new Error(`Game with ${gameId} not exist`));
    }

    // check invalid ship
    if (!game.defender.ships[options.ship]) {
      return Promise.reject(new Error(`${options.ship} is not exist`));
    }

    const allDeploy = Object.keys(game.defender.ships).every((key) => {
      const ship = game.defender.ships[key];
      return ship.amount === 0;
    });

    if (allDeploy) {
      return Promise.reject(new Error("all ships has been deployed"));
    }

    const gridsNumber = battleship.toGrid(row, column);

    if (
      game.occupiedGrids.includes(gridsNumber) ||
      game.adjacentGrids.includes(gridsNumber)
    ) {
      return Promise.reject(
        new Error(`column ${column} and row ${row} were occupied or adjacent`)
      );
    }

    const ship = game.defender.ships[options.ship];
    if (ship.amount < 1) {
      return Promise.reject(new Error(`no more ${ship.name} ship`));
    }
    const rowMaxGrid = row * game.size;
    const columnMaxGrid = 10 * (game.size - 1) + column;
    const lastGrid = options.isVertical
      ? gridsNumber + 10 * (ship.size - 1)
      : gridsNumber + ship.size - 1;

    if (options.isVertical) {
      if (lastGrid > columnMaxGrid) {
        return Promise.reject(new Error("exceed vertical grid"));
      }
    } else {
      if (lastGrid > rowMaxGrid) {
        return Promise.reject(new Error("exceed horizontal grid"));
      }
    }
    let placementGrid = {
      ship: ship.name,
      grids: [],
    };

    for (let i = 0; i < ship.size; i++) {
      let gridToPush;
      if (options.isVertical) {
        gridToPush = gridsNumber + 10 * i;
      } else {
        gridToPush = gridsNumber + i;
      }
      game.occupiedGrids.push(gridToPush);
      placementGrid.grids.push(gridToPush);
    }
    game.defender.placements.push(placementGrid);

    let adjacentGrids = battleship.getAdjacent({
      row: row,
      column: column,
      ship: ship,
      isVertical: options.isVertical,
      size: game.size,
    });

    // remove adjacent overlap with occypyGrids
    adjacentGrids = _.difference(adjacentGrids, game.occupiedGrids);
    game.adjacentGrids = game.adjacentGrids.concat(adjacentGrids);
    ship.amount -= 1;
    game.markModified("defender");

    history.save({
      gameId: game._id,
      action: Constants.deploy,
      payload: {
        row: options.row,
        column: options.column,
        ship: options.ship,
        isVertical: options.isVertical
      }
    });

    return game.save();
  },
};
