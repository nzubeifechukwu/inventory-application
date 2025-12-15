const db = require("../db/queries");
const {
  title,
  links,
  getByLinks,
  getByGenresLinks,
  getByPricesLinks,
  getByQtyInStockLinks,
  getByQtySoldLinks,
} = require("../utils/utils");

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

async function getByGenres(req, res) {
  const books = await db.getAllBooks();
  res.render("viewByGenres", {
    title,
    links,
    books,
    getByLinks,
    getByGenresLinks,
  });
}

async function getByPrices(req, res) {
  const books = await db.getAllBooks();
  res.render("viewByPrices", {
    title,
    links,
    books,
    getByLinks,
    getByPricesLinks,
  });
}

async function getByQtyInStock(req, res) {
  const books = await db.getAllBooks();
  res.render("viewByQtyInStock", {
    title,
    links,
    books,
    getByLinks,
    getByQtyInStockLinks,
  });
}

async function getByQtySold(req, res) {
  const books = await db.getAllBooks();
  res.render("viewByQtySold", {
    title,
    links,
    books,
    getByLinks,
    getByQtySoldLinks,
  });
}

module.exports = {
  getAllBooks,
  addNewBookGet,
  addNewBookPost,
  getBy,
  getByGenres,
  getByPrices,
  getByQtyInStock,
  getByQtySold,
};
