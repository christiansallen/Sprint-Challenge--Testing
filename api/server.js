const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const games = require("../games/GamesModel.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up and running" });
});

server.get("/games", (req, res) => {
  games
    .getAll()
    .then(game => {
      if (game.length === 0) {
        return [];
      } else {
        return res.status(200).json(game);
      }
    })
    .catch(() => res.status(500).json({ message: "error" }));
});

server.post("/games", (req, res) => {
  const { title, genre, releaseYear } = req.body;

  if (!title || !genre) {
    return res.status(422).json({ message: "Please enter a title AND genre" });
  } else {
    games
      .insert({ title, genre, releaseYear })
      .then(game => res.status(201).json(game))
      .catch(() => res.status(500).json({ message: "server error" }));
  }
});

module.exports = server;
