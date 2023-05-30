const { app } = require("../app.js");
const connection = require("../db/connection.js");
const request = require("supertest");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data");
const sorted = require("jest-sorted");

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

describe("GET /api/articles/:article_id", () => {
  it("should return article object", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then((res) => {
        expect(typeof res.body).toBe("object");
      });
  });
  it("should return the correct article", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then((res) => {
        expect(res.body.article.article_id).toBe(3);
      });
  });
  it("should have correct properties", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then((res) => {
        expect(res.body.article).toHaveProperty("article_id");
        expect(res.body.article).toHaveProperty("title");
        expect(res.body.article).toHaveProperty("topic");
        expect(res.body.article).toHaveProperty("author");
        expect(res.body.article).toHaveProperty("body");
        expect(res.body.article).toHaveProperty("created_at");
        expect(res.body.article).toHaveProperty("article_img_url");
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
        expect(res.body.result).toBeSorted("created_at", { descending: true });
      });
  });
  it("should have all properties correct", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        res.body.result.forEach((article) => {
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("article_img_url");
        });
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

describe("GET /api/articles/:article_id/comments", () => {
  it("should retrieve the comments for a specific article ID", () => {
    const expectedComments = [
      {
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        article_id: 9,
      },
      {
        body: "The owls are not what they seem.",
        votes: 20,
        author: "icellusedkars",
        article_id: 9,
      },
    ];

    return request(app)
      .get(`/api/articles/9/comments`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(
          response.body.article.map((comment) => ({
            body: comment.body,
            votes: comment.votes,
            author: comment.author,
            article_id: comment.article_id,
          }))
        ).toEqual(expectedComments);
      });
  });

  it("should return an empty array if there are no comments for the specified article ID", () => {
    return request(app)
      .get(`/api/articles/2/comments`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.article).toEqual([]);
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  it("it should add comment to correct article", () => {
    const newComment = {
      username: "icellusedkars",
      body: "this is a new comment",
    };

    return request(app)
      .post("/api/articles/9/comments")
      .send(newComment)
      .then((response) => {
        expect(response.body.comment.comment_id).toBe(19);
        expect(response.body.comment.body).toBe("this is a new comment");
        expect(response.body.comment.article_id).toBe(9);
        expect(response.body.comment.author).toBe("icellusedkars");
        expect(response.body.comment.votes).toBe(0);
        expect(typeof response.body.comment.created_at).toBe("string");
      });
  });
  it("should ignore unnecessary properties", () => {
    const newComment = {
      username: "icellusedkars",
      body: "this is a new comment",
      test: "sam",
    };
    return request(app)
      .post("/api/articles/9/comments")
      .send(newComment)
      .then((response) => {
        expect(response.body.comment.test).toBe(undefined);
      });
  });
  it("should return status 400 invalid id when required", () => {
    const newComment = {
      username: "icellusedkars",
      body: "this is a new comment",
    };
    return request(app)
      .post("/api/articles/not_an_id/comments")
      .send(newComment)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Bad Request" });
      });
  });
  // it("should return 404 for nonexistant id", () => {
  //   const newComment = {
  //     username: "icellusedkars",
  //     body: "this is a new comment",
  //   };
  //   return request(app)
  //     .post("/api/articles/not_an_id/comments")
  //     .send(newComment)
  //     .then((response) => {
  //       console.log(response);
  //       expect(response.body).toEqual({ msg: "non existant" });
  //     });
  // });
});

/* 
    no body needs custom error handling- model thrown error
*/

describe("PATCH /api/articles/:article_id", () => {
  it("should change the article's vote property by the given amount", () => {
    const vote = { inc_vote: 1 };
    return request(app)
      .patch("/api/articles/1")
      .send(vote)
      .then((response) => {
        expect(response.body.rows[0].votes).toEqual(101);
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  it("should delete the given comment", () => {
    return request(app)
      .delete("/api/comments/1")
      .then((response) => {
        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
      });
  });
});

// describe("GET /api/users", () => {
//   it("should return users", () => {
//     return request(app)
//       .get("/api/users")
//       .then((response) => {
//         expect(response.body).toEqual([
//           {
//             username: "butter_bridge",
//             name: "jonny",
//             avatar_url:
//               "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
//           },
//           {
//             username: "icellusedkars",
//             name: "sam",
//             avatar_url:
//               "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
//           },
//           {
//             username: "rogersop",
//             name: "paul",
//             avatar_url:
//               "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
//           },
//           {
//             username: "lurker",
//             name: "do_nothing",
//             avatar_url:
//               "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
//           },
//         ]);
//       });
//   });
// });
