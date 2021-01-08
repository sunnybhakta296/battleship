const request = require("supertest");
const expect = require("chai").expect;
const app = require("../app");
const battleship = require("../repositories/battleship");

describe("POST /game/create", () => {
  it("should response 200 and created new game", (done) => {
    request(app)
      .post("/game/create")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("POST /deploy", () => {
  it("should response 200 for game deployment and created new game", function () {
    return new Promise(async function (resolve) {
      const game = await battleship.createGame();
      request(app)
        .post(`/game/deploy/${game._id}`)
        .send({
          row: 1,
          column: 1,
          ship: "battleship",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, resolve);
    });
  });
});
