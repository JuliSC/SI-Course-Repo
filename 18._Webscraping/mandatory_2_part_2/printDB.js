import db from "./database/connection.js";

const dbPosts = await db.all("SELECT * FROM posts");
console.log(dbPosts);
