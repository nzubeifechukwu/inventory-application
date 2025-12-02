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
  genre_id INTEGER REFERENCES genres(genre_id),
  quantity_in_stock INTEGER,
  quantity_sold INTEGER
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
