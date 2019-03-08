const request = require("supertest");

const server = require("./server.js");

describe("server", () => {
  describe("GET/", () => {
    it("should return status code 200", () => {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    it("should be application type json", () => {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.type).toBe("application/json");
        });
    });
    it("should return api: up and running", () => {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.body).toEqual({ api: "up and running" });
        });
    });
    it("should return the list of games", () => {
      const dummy = [
        { genre: "dummy", id: 1, title: "dummy" },
        { genre: "dummy", id: 2, title: "dummy" }
      ];
      return request(server)
        .get("/games")
        .then(res => {
          expect(dummy).toEqual([
            { genre: "dummy", id: 1, title: "dummy" },
            { genre: "dummy", id: 2, title: "dummy" }
          ]);
        });
    });
  });
  describe("POST/", () => {
    it("should return code 422 if title or genre isnt entered correctly.", () => {
      return request(server)
        .post("/games")
        .then(res => {
          expect(res.status).toBe(422);
        });
    });
    it("should return code 201 if title and genre is entered correctly.", () => {
      return request(server)
        .post("/games")
        .send({ title: "dummyGame", genre: "sprint" })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
  });
});
