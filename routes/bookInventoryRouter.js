const { Router } = require("express");
const bookInventoryControllers = require("../controllers/bookInventoryControllers");

const bookInventoryRouter = Router();

bookInventoryRouter.get("/", bookInventoryControllers.getAllBooks);
bookInventoryRouter.get("/new", bookInventoryControllers.addNewBookGet);
bookInventoryRouter.post("/new", bookInventoryControllers.addNewBookPost);
bookInventoryRouter.get(
  "/view-by/genres",
  bookInventoryControllers.getByGenres
);
bookInventoryRouter.get(
  "/view-by/prices",
  bookInventoryControllers.getByPrices
);
bookInventoryRouter.get(
  "/view-by/qty-stock",
  bookInventoryControllers.getByQtyInStock
);
bookInventoryRouter.get(
  "/view-by/qty-sold",
  bookInventoryControllers.getByQtySold
);
bookInventoryRouter.get(
  "/view-by/genres/:genre",
  bookInventoryControllers.getBooksByGenre
);
bookInventoryRouter.get(
  "/view-by/prices/:price",
  bookInventoryControllers.getBooksByPrice
);
bookInventoryRouter.get(
  "/view-by/qty-stock/:qtyStock",
  bookInventoryControllers.getBooksByQtyInStock
);
bookInventoryRouter.get(
  "/view-by/qty-sold/:qtySold",
  bookInventoryControllers.getBooksByQtySold
);

module.exports = bookInventoryRouter;
