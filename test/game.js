const Promise = require("bluebird");
const expect = require("chai").expect;
const app = require("../app");
const battleship = require("../repositories/battleship");
const Constants = require("../constants");
const Game = require("../models/game");
const History = require("../models/history");

describe("To test complete game session", () => {
  before(()=> {
    let game;
  });
  it("Create new game", async () => {
    game = await battleship.createGame();
    expect(game._id).to.be.a("object");
  });
  it("deploy all ships", async () => {
    const options = [
      {
        row: 1,
        column: 1,
        ship: "battleship",
      },
      {
        row: 1,
        column: 6,
        ship: "cruiser",
        isVertical: true,
      },
      {
        row: 1,
        column: 10,
        ship: "cruiser",
        isVertical: true,
      },
      {
        row: 5,
        column: 1,
        ship: "destroyer",
        isVertical: true,
      },
      {
        row: 10,
        column: 1,
        ship: "destroyer",
      },
      {
        row: 10,
        column: 9,
        ship: "destroyer",
      },
      {
        row: 6,
        column: 5,
        ship: "submarine",
      },
      {
        row: 6,
        column: 7,
        ship: "submarine",
      },
      {
        row: 5,
        column: 10,
        ship: "submarine",
      },
      {
        row: 7,
        column: 9,
        ship: "submarine",
      },
    ];

    await Promise.each(options, async (option) => {
      const deploy = await battleship.deploy(game._id, option);
      expect(game._id.toString()).to.equal(deploy._id.toString());
    });
  });
  it("Start attack and win the match", async () => {
    const actions = [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4], 
      [9, 10],
      [1, 6],
      [1, 8],
      [1, 8],
      [2, 6],
      [2, 8],
      [3, 6],
      [1, 10],
      [2, 10],
      [3, 10],
      [5, 1],
      [6, 1],
      [10, 1],
      [10, 2],
      [7, 3],
      [10, 9],
      [10, 10],
      [9, 5],
      [5, 10],
      [6, 5],
      [6, 7],
      [7, 9],
    ];

    let win;
    const attack = await Promise.each(actions, async (item) => {
      const row = item[0];
      const column = item[1];

      const response = await battleship.attack(game._id, { row, column });
      if (response.result === Constants.win) {
        win = response.result;
      }
    });
    expect(win).to.equal(Constants.win);
  });
  after(async ()=>{
    Game.remove({_id: game._id}).exec();
    History.remove({gameId: game._id}).exec();
  })
});
