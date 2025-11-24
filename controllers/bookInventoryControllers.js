const db = require("../db/queries");
const { title, links } = require("../utils/utils");

async function getAllStock(req, res) {
  const books = await db.getAllStock();
  res.render("index", { books: books, title: title, links: links });
}

module.exports = { getAllStock };
