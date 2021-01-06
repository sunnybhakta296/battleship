const request = require("supertest");
const expect = require("chai").expect;
const app = require("../app");
const battleship = require("../repositories/battleship");

describe("Battleship", () => {
  describe("#createGame()", () => {
    it("should return game info", async () => {
      const game = await battleship.createGame();
      expect(game._id).to.be.a("object");
      expect(game.attacker).deep.equal({
        hitGrids: [],
        missGrids: [],
      });
    });
  });
});
