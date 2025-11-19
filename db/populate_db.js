#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS authors (
  author_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR(100),
  last_name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS genres (
  genre_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  genre VARCHAR(50) UNIQUE
);

CREATE TABLE IF NOT EXISTS books (
  book_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255),
  selling_price NUMERIC(10, 2) NOT NULL,
  author_id INTEGER REFERENCES authors(author_id),
  genre_id INTEGER REFERENCES genres(genre_id)
);

CREATE TABLE IF NOT EXISTS inventory (
  inventory_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  book_id INTEGER REFERENCES books(book_id) UNIQUE,
  quantity_in_stock INTEGER,
  minimum_stock_level INTEGER,
  average_cost NUMERIC(10, 2),
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sales (
  sale_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  sale_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  customer_name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS sale_items (
  sale_item_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  sale_id INTEGER REFERENCES sales(sale_id),
  book_id INTEGER REFERENCES books(book_id),
  quantity_sold INTEGER,
  unit_price NUMERIC(10, 2)
);
`;

async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString: process.env.CONNECTION_STRING || process.env.DATABASE_URL,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("done");
}

main();
