exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("games")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("games").insert([
        { title: "pacman", genre: "arcade", releaseYear: 1980 },
        { title: "space invaders", genre: "arcade", releaseYear: 1981 },
        {
          title: "super smash bros melee",
          genre: "fighting",
          releaseYear: 2001
        }
      ]);
    });
};
