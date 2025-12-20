const { validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const {
  pageTitle,
  links,
  getByGenresLinks,
  getByPricesLinks,
  getByQtyInStockLinks,
  getByQtySoldLinks,
} = require("../utils/utils");
const validateBookDetails = require("../inputValidators/inputValidator");

async function getAllBooks(req, res) {
  const books = await db.getAllBooks();
  res.render("index", { books, pageTitle, links });
}

function addNewBookGet(req, res) {
  res.render("bookForm", { pageTitle, links });
}

// const addNewBookPost = [
//   validateBookDetails,
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).render("bookForm", {
//         pageTitle,
//         links,
//         errors: errors.array(),
//       });
//     }
//     const {
//       title,
//       first_name,
//       last_name,
//       genre,
//       selling_price,
//       quantity_in_stock,
//       quantity_sold,
//     } = matchedData(req);

//     await db.insertBook(
//       title.toLowerCase(),
//       first_name.toLowerCase(),
//       last_name.toLowerCase(),
//       genre.toLowerCase(),
//       parseFloat(selling_price).toFixed(2),
//       parseInt(quantity_in_stock, 10),
//       parseInt(quantity_sold, 10)
//     );

//     res.redirect("/");
//   },
// ];

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
    pageTitle,
    links,
    books,
    getByGenresLinks,
  });
}

async function getByPrices(req, res) {
  const books = await db.getAllBooks();
  res.render("viewByPrices", {
    pageTitle,
    links,
    books,
    getByPricesLinks,
  });
}

async function getByQtyInStock(req, res) {
  const books = await db.getAllBooks();
  res.render("viewByQtyInStock", {
    pageTitle,
    links,
    books,
    getByQtyInStockLinks,
  });
}

async function getByQtySold(req, res) {
  const books = await db.getAllBooks();
  res.render("viewByQtySold", {
    pageTitle,
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
    pageTitle,
    links,
    getByGenresLinks,
  });
}

async function getBooksByPrice(req, res) {
  const { price } = req.params;
  const books = await db.getBooksByPrice(price);
  res.render("viewByPrices", {
    books,
    pageTitle,
    links,
    getByPricesLinks,
  });
}

async function getBooksByQtyInStock(req, res) {
  const { qtyStock } = req.params;
  const books = await db.getBooksByQtyInStock(qtyStock);
  res.render("viewByQtyInStock", {
    books,
    pageTitle,
    links,
    getByQtyInStockLinks,
  });
}

async function getBooksByQtySold(req, res) {
  const { qtySold } = req.params;
  const books = await db.getBooksByQtySold(qtySold);
  res.render("viewByQtySold", {
    books,
    pageTitle,
    links,
    getByQtySoldLinks,
  });
}

async function getBookDetails(req, res) {
  const { id } = req.params;
  const books = await db.getBookDetails(id);

  if (!books.length) {
    throw new CustomNotFoundError(`book id ${id} not found`);
  }

  res.render("editBook", { book: books[0], pageTitle, links });
}

// const editBook = [
//   validateBookDetails,
//   async (req, res) => {
//     const errors = validationResult(req);
//     const { id } = req.params;
//     if (!errors.isEmpty()) {
//       const books = await db.getBookDetails(id);
//       return res.status(400).render("editBook", {
//         book: books[0],
//         pageTitle,
//         links,
//         errors: errors.array(),
//       });
//     }
//     // const { id } = req.params;
//     const {
//       title,
//       first_name,
//       last_name,
//       genre,
//       selling_price,
//       quantity_in_stock,
//       quantity_sold,
//     } = matchedData(req);

//     await db.updateBook(
//       parseInt(id, 10),
//       title.toLowerCase(),
//       first_name.toLowerCase(),
//       last_name.toLowerCase(),
//       genre,
//       parseFloat(selling_price).toFixed(2),
//       parseInt(quantity_in_stock, 10),
//       parseInt(quantity_sold, 10)
//     );

//     res.redirect("/");
//   },
// ];

async function editBook(req, res) {
  const { id } = req.params;
  const {
    title,
    first_name,
    last_name,
    genre,
    selling_price,
    quantity_in_stock,
    quantity_sold,
  } = req.body;
  await db.updateBook(
    id,
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

async function deleteBook(req, res) {
  const { id } = req.params;
  await db.deleteBook(id);
  res.redirect("/");
}

async function deleteAllBooks(req, res) {
  await db.deleteAllBooks();
  res.redirect("/");
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
  getBookDetails,
  editBook,
  deleteBook,
  deleteAllBooks,
};
