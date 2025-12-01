const { Router } = require("express");
const bookInventoryControllers = require("../controllers/bookInventoryControllers");

const bookInventoryRouter = Router();

bookInventoryRouter.get("/", bookInventoryControllers.getAllBooks);
bookInventoryRouter.get("/new", bookInventoryControllers.addNewBookGet);
bookInventoryRouter.post("/new", bookInventoryControllers.addNewBookPost);

module.exports = bookInventoryRouter;
