import db from "./database/connection.js";

db.exec("CREATE TABLE IF NOT EXISTS movies (title, year, score)");

db.run("INSERT INTO movies (title, year, score) VALUES (?, ?, ?)", [
  "The Matrix",
  1999,
  8.7,
]);

db.run("INSERT INTO movies (title, year, score) VALUES (?, ?, ?)", [
  "The Matrix Reloaded",
  2003,
  7.2,
]);

const movies = await db.all("SELECT * FROM movies");
console.log(movies);
