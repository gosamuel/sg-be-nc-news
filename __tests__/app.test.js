const { app } = require("../app.js");
const connection = require("../db/connection.js");
const request = require("supertest");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));

afterAll(() => {
  connection.end();
});
describe("GET api/topics", () => {
  it("responds with array containing all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        expect(res.body.topics.length).toBe(3);
      });
  });
  it("should have correct properties for each topic", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        res.body.topics.forEach(
          (topic) => expect(topic).toHaveProperty("description"),
          (topic) => expect(topic).toHaveProperty("slug")
        );
      });
  });
  it("throws error if given path that doesn't exist", () => {
    return request(app).get("/api/nonsense").expect(404);
  });
});