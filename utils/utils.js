const title = "Book Inventory";
const links = [
  { href: "/", text: "Home" },
  { href: "/new", text: "Add Book" },
  { href: "/view-by", text: "View By" },
];

const getByLinks = [
  { href: "/view-by/genres", text: "Genres" },
  { href: "/view-by/prices", text: "Selling Prices" },
  { href: "/view-by/qty-stock", text: "Quantities in Stock" },
  { href: "/view-by/qty-sold", text: "Quantities Sold" },
];

module.exports = { links, title, getByLinks };
