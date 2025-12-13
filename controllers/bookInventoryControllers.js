const db = require("../db/queries");
const { title, links } = require("../utils/utils");

async function getAllBooks(req, res) {
  const books = await db.getAllBooks();
  res.render("index", { books: books, title: title, links: links });
}

function addNewBookGet(req, res) {
  res.render("bookForm", { title: title, links: links });
}

async function addNewBookPost(req, res) {
  console.log(req.body);
  const { title, first_name, last_name, genre, selling_price } = req.body;
  await db.insertBook(
    title,
    first_name,
    last_name,
    genre,
    parseFloat(selling_price).toFixed(2)
  );
  res.redirect("/");
}

module.exports = { getAllBooks, addNewBookGet, addNewBookPost };
