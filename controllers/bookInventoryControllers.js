const db = require("../db/queries");

async function getAllStock(req, res) {
  const books = await db.getAllStock();
  res.render("index", { books: books });
}

module.exports = { getAllStock };
