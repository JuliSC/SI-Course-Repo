import fs from "fs";

// const response = await fetch("https://www.proshop.dk/bærbar-computer");
// const result = await response.text();
// fs.writeFileSync("index.html", result);

import {load} from "cheerio";

const page = fs.readFileSync("index.html", "utf-8");
const $ = load(page);

const products = $("#products [product]").each((index, element) => {
  const name = $(element).find("[product-display-name]").text();
  console.log(name);

  const price = $(element).find(".site-currency-lg").text();
  console.log(price);

  console.log();
});
