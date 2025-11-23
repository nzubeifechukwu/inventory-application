const express = require("express");
const path = require("node:path");

const bookInventoryRouter = require("./routes/bookInventoryRouter");
const { error } = require("node:console");

const app = express();
const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/", bookInventoryRouter);

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Express app listening on port ${PORT}`);
});
