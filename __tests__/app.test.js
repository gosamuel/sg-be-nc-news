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

describe("GET /api/articles", () => {
  it("should return articles without body property", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        res.body.result.forEach((article) =>
          expect(article).not.toHaveProperty("body")
        );
      });
  });
  it("should return an array of objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.result)).toBe(true);
        res.body.result.forEach((article) =>
          expect(typeof article).toBe("object")
        );
      });
  });
  it("should return articles in desc date order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        res.body.result.forEach((article, index) => {
          if (index < res.body.result.length - 1) {
            expect(
              article.created_at > res.body.result[index + 1].created_at
            ).toBe(true);
          }
        });
      });
  });
  it("should have seven properties on each object", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        res.body.result.forEach((article) =>
          expect(Object.keys(article).length).toBe(7)
        );
      });
  });
  it("should contain every object in database", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        expect(res.body.result.length).toBe(12);
      });
  });
});
