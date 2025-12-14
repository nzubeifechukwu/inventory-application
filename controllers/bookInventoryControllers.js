const db = require("../db/queries");
const { title, links, getByLinks } = require("../utils/utils");

async function getAllBooks(req, res) {
  const books = await db.getAllBooks();
  res.render("index", { books, title, links });
}

function addNewBookGet(req, res) {
  res.render("bookForm", { title, links });
}

async function addNewBookPost(req, res) {
  const {
    title,
    first_name,
    last_name,
    genre,
    selling_price,
    quantity_in_stock,
    quantity_sold,
  } = req.body;

  await db.insertBook(
    title,
    first_name,
    last_name,
    genre,
    parseFloat(selling_price).toFixed(2),
    parseInt(quantity_in_stock, 10),
    parseInt(quantity_sold, 10)
  );

  res.redirect("/");
}

async function getBy(req, res) {
  const books = await db.getAllBooks();
  res.render("viewBy", { title, links, getByLinks, books });
}

module.exports = { getAllBooks, addNewBookGet, addNewBookPost, getBy };
