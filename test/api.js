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
