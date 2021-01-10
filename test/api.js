const request = require("supertest");
const expect = require("chai").expect;
const app = require("../app");
const battleship = require("../repositories/battleship");
const Game = require("../models/game");
const History = require("../models/history");
const mongoose = require("mongoose");

describe("POST /game/create", () => {
  before(() => {
    let gameId;
  });
  it("should response 200 and created new game", async () => {
    const respone = await request(app)
      .post("/game/create")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);
    gameId = mongoose.Types.ObjectId(respone.body._id);
    expect(respone.statusCode).to.equal(200);

    //todo add more scenario for test
  });
  after(async () => {
    Game.deleteOne({ _id: gameId }).exec();
    History.deleteMany({ gameId: gameId }).exec();
  });
});

describe("POST /deploy", () => {
  before(() => {
    let gameId;
  });
  it("should response 200 for game deployment", async () => {
    const game = await battleship.createGame();
    const deploy = await request(app)
      .post(`/game/deploy/${game._id}`)
      .send({
        row: 1,
        column: 1,
        ship: "battleship",
      })
      .set("Accept", "application/json");
    gameId = mongoose.Types.ObjectId(deploy.body._id);
    expect(deploy.statusCode).to.equal(200);
    expect(deploy.body._id.toString()).to.equal(game._id.toString());

    //todo add more scenario for test
  });
  after(async () => {
    Game.deleteOne({ _id: gameId }).exec();
    History.deleteMany({ gameId: gameId }).exec();
  });
});



//todo test case for attack



//todo test case get status