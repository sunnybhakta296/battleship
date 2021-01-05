const request = require("supertest");
const expect = require("chai").expect;
const app = require("../app");

describe("Get /hello", () => {
  it("should resonse 200", (done) => {
    request(app)
      .get("/hello")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
