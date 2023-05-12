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

});

describe("GET api/", () => {
  it("should return JSON object", () => {
    return request(app)
      .get("/api")
      .then(expect(200))
      .then((res) => {
        expect(typeof res).toBe("object");
      });
  });
});

describe("GET /api/article/:article_id", () => {
  it("should return article object", () => {
    return request(app)
      .get("/api/article/3")
      .expect(200)
      .then((res) => {
        expect(typeof res.body).toBe("object");
      });
  });
  it("should return the correct article", () => {
    return request(app)
      .get("/api/article/3")
      .expect(200)
      .then((res) => {
        expect(res.body.article.article_id).toBe(3);
      });
  });
  it("should have correct number of properties", () => {
    return request(app)
      .get("/api/article/2")
      .expect(200)
      .then((res) => {
        expect(Object.keys(res.body.article).length).toBe(8);
      });
  });
});
describe("GET /api/nonsense", () => {

  it("throws error if given path that doesn't exist", () => {
    return request(app).get("/api/nonsense").expect(404);
  });
});
