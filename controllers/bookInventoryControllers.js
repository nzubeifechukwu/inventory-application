const db = require("../db/queries");

async function getAllStock(req, res) {
  const books = await db.getAllStock();
  res.render("index", { books: books, title: "Book Inventory" });
}

module.exports = { getAllStock };
