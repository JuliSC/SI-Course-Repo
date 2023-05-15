import fs from "fs";
import {load} from "cheerio";
import db from "./database/connection.js";

// db.exec("DROP TABLE IF EXISTS posts");
db.exec("CREATE TABLE IF NOT EXISTS posts (title, img UNIQUE)");

// const response = await fetch("https://www.reddit.com/r/BreadStapledToTrees");
// const result = await response.text();
// fs.writeFileSync("index.html", result);

const page = fs.readFileSync("index.html", "utf-8");
const $ = load(page);

const posts = $(".Post")
  .slice(1)
  .map((index, element) => {
    const post = {};

    const title = $(element).find("h3").text();
    post.title = title;

    const img = $(element).find("div[data-click-id='media'] img").attr("src");
    post.img = img;

    return post;
  })
  .get();

for (const post of posts) {
  try {
    await db.run("INSERT INTO posts (title, img) VALUES (?, ?)", [
      post.title,
      post.img,
    ]);
  } catch (err) {
    console.log("ERROR CAUGHT: " + err);
  }
}
