const { text } = require("express");

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

const getByGenresLinks = [
  { href: "/view-by/genres/literature", text: "Literature" },
  { href: "/view-by/genres/science", text: "Science" },
  { href: "/view-by/genres/philosophy", text: "Philosophy" },
  { href: "/view-by/genres/psychology", text: "Psychology" },
  { href: "/view-by/genres/history", text: "History" },
  { href: "/view-by/genres/self-help", text: "Self-Help" },
  { href: "/view-by/genres/other", text: "Other" },
];

const getByPricesLinks = [
  { href: "/view-by/prices/cheap", text: "Cheap: <20" },
  { href: "/view-by/prices/affordable", text: "Affordable: 20-50" },
  { href: "/view-by/prices/pricey", text: "Pricey: 51-100" },
  { href: "/view-by/prices/exorbitant", text: "Exorbitant: >100" },
];

const getByQtyInStockLinks = [
  { href: "/view-by/qty-stock/low", text: "Low: <20" },
  { href: "/view-by/qty-stock/medium", text: "Medium: 20-50" },
  { href: "/view-by/qty-stock/full", text: "Full: >50" },
];

const getByQtySoldLinks = [
  { href: "/view-by/qty-sold/low", text: "Low: <20" },
  { href: "/view-by/qty-sold/moderate", text: "Moderate: 20-50" },
  { href: "/view-by/qty-sold/high", text: "High: >50" },
];

module.exports = {
  links,
  title,
  getByLinks,
  getByGenresLinks,
  getByPricesLinks,
  getByQtyInStockLinks,
  getByQtySoldLinks,
};
