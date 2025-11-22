const { Router } = require("express");
const bookInventoryControllers = require("../controllers/bookInventoryControllers");

const bookInventoryRouter = Router();

bookInventoryRouter.get("/", bookInventoryControllers.getAllStock);

module.exports = bookInventoryRouter;
