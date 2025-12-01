const db = require("../db/queries");
const { title, links } = require("../utils/utils");

async function getAllBooks(req, res) {
  const books = await db.getAllBooks();
  res.render("index", { books: books, title: title, links: links });
}

function addNewBookGet(req, res) {
  res.render("bookForm", { title: title });
}

async function addNewBookPost(req, res) {
  const { title, first_name, last_name, genre } = req.body;
  await db.insertBook(title, first_name, last_name, genre);
  res.redirect("/");
}

module.exports = { getAllBooks, addNewBookGet, addNewBookPost };
