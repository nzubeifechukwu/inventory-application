const db = require("../db/queries");
const {
  title,
  links,
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
    title.toLowerCase(),
    first_name.toLowerCase(),
    last_name.toLowerCase(),
    genre.toLowerCase(),
    parseFloat(selling_price).toFixed(2),
    parseInt(quantity_in_stock, 10),
    parseInt(quantity_sold, 10)
  );

  res.redirect("/");
}

async function getByGenres(req, res) {
  const books = await db.getAllBooks();
  res.render("viewByGenres", {
    title,
    links,
    books,
    getByGenresLinks,
  });
}

async function getByPrices(req, res) {
  const books = await db.getAllBooks();
  res.render("viewByPrices", {
    title,
    links,
    books,
    getByPricesLinks,
  });
}

async function getByQtyInStock(req, res) {
  const books = await db.getAllBooks();
  res.render("viewByQtyInStock", {
    title,
    links,
    books,
    getByQtyInStockLinks,
  });
}

async function getByQtySold(req, res) {
  const books = await db.getAllBooks();
  res.render("viewByQtySold", {
    title,
    links,
    books,
    getByQtySoldLinks,
  });
}

async function getBooksByGenre(req, res) {
  const { genre } = req.params;
  const books = await db.getBooksByGenre(genre);
  res.render("viewByGenres", {
    books,
    title,
    links,
    getByGenresLinks,
  });
}

async function getBooksByPrice(req, res) {
  const { price } = req.params;
  const books = await db.getBooksByPrice(price);
  res.render("viewByPrices", {
    books,
    title,
    links,
    getByPricesLinks,
  });
}

async function getBooksByQtyInStock(req, res) {
  const { qtyStock } = req.params;
  const books = await db.getBooksByQtyInStock(qtyStock);
  res.render("viewByQtyInStock", {
    books,
    title,
    links,
    getByQtyInStockLinks,
  });
}

async function getBooksByQtySold(req, res) {
  const { qtySold } = req.params;
  const books = await db.getBooksByQtySold(qtySold);
  res.render("viewByQtySold", {
    books,
    title,
    links,
    getByQtySoldLinks,
  });
}

module.exports = {
  getAllBooks,
  getBooksByGenre,
  getBooksByPrice,
  getBooksByQtyInStock,
  getBooksByQtySold,
  addNewBookGet,
  addNewBookPost,
  getByGenres,
  getByPrices,
  getByQtyInStock,
  getByQtySold,
};
