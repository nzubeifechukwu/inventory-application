const pool = require("./pool");

async function getAllBooks() {
  const { rows } = await pool.query(`
        SELECT
          title,
          selling_price,
          quantity_in_stock,
          quantity_sold,
          CONCAT(first_name, ' ', last_name) author,
          genre
        FROM
          books b
          JOIN authors a ON b.author_id = a.author_id
          JOIN genres g ON b.genre_id = g.genre_id
        `);
  return rows;
}

async function getBooksByGenre(genre) {
  const { rows } = await pool.query(
    `
    SELECT
      title,
      selling_price,
      quantity_in_stock,
      quantity_sold,
      CONCAT(first_name, ' ', last_name) author,
      genre
    FROM
      books b
      JOIN authors a ON b.author_id = a.author_id
      JOIN genres g ON b.genre_id = g.genre_id
    WHERE genre = $1
    `,
    [genre]
  );
  return rows;
}

async function getBooksByPrice(price) {
  if (price === "cheap") {
    const { rows } = await pool.query(`
    SELECT
      title,
      selling_price,
      quantity_in_stock,
      quantity_sold,
      CONCAT(first_name, ' ', last_name) author,
      genre
    FROM
      books b
      JOIN authors a ON b.author_id = a.author_id
      JOIN genres g ON b.genre_id = g.genre_id
    WHERE selling_price < 20
    `);
    return rows;
  } else if (price === "affordable") {
    const { rows } = await pool.query(`
    SELECT
      title,
      selling_price,
      quantity_in_stock,
      quantity_sold,
      CONCAT(first_name, ' ', last_name) author,
      genre
    FROM
      books b
      JOIN authors a ON b.author_id = a.author_id
      JOIN genres g ON b.genre_id = g.genre_id
    WHERE selling_price >= 20 AND selling_price <= 50
    `);
    return rows;
  } else if (price === "pricey") {
    const { rows } = await pool.query(`
    SELECT
      title,
      selling_price,
      quantity_in_stock,
      quantity_sold,
      CONCAT(first_name, ' ', last_name) author,
      genre
    FROM
      books b
      JOIN authors a ON b.author_id = a.author_id
      JOIN genres g ON b.genre_id = g.genre_id
    WHERE selling_price > 50 AND selling_price <= 100
    `);
    return rows;
  } else {
    const { rows } = await pool.query(`
    SELECT
      title,
      selling_price,
      quantity_in_stock,
      quantity_sold,
      CONCAT(first_name, ' ', last_name) author,
      genre
    FROM
      books b
      JOIN authors a ON b.author_id = a.author_id
      JOIN genres g ON b.genre_id = g.genre_id
    WHERE selling_price > 100
    `);
    return rows;
  }
}

async function getBooksByQtyInStock(qtyStock) {
  if (qtyStock === "low") {
    const { rows } = await pool.query(`
    SELECT
      title,
      selling_price,
      quantity_in_stock,
      quantity_sold,
      CONCAT(first_name, ' ', last_name) author,
      genre
    FROM
      books b
      JOIN authors a ON b.author_id = a.author_id
      JOIN genres g ON b.genre_id = g.genre_id
    WHERE quantity_in_stock < 20
    `);
    return rows;
  } else if (qtyStock === "medium") {
    const { rows } = await pool.query(`
    SELECT
      title,
      selling_price,
      quantity_in_stock,
      quantity_sold,
      CONCAT(first_name, ' ', last_name) author,
      genre
    FROM
      books b
      JOIN authors a ON b.author_id = a.author_id
      JOIN genres g ON b.genre_id = g.genre_id
    WHERE quantity_in_stock >= 20 AND quantity_in_stock <= 50
    `);
    return rows;
  } else {
    const { rows } = await pool.query(`
    SELECT
      title,
      selling_price,
      quantity_in_stock,
      quantity_sold,
      CONCAT(first_name, ' ', last_name) author,
      genre
    FROM
      books b
      JOIN authors a ON b.author_id = a.author_id
      JOIN genres g ON b.genre_id = g.genre_id
    WHERE quantity_in_stock > 50
    `);
    return rows;
  }
}

async function getBooksByQtySold(qtySold) {
  if (qtySold === "low") {
    const { rows } = await pool.query(`
    SELECT
      title,
      selling_price,
      quantity_in_stock,
      quantity_sold,
      CONCAT(first_name, ' ', last_name) author,
      genre
    FROM
      books b
      JOIN authors a ON b.author_id = a.author_id
      JOIN genres g ON b.genre_id = g.genre_id
    WHERE quantity_sold < 20
    `);
    return rows;
  } else if (qtySold === "moderate") {
    const { rows } = await pool.query(`
    SELECT
      title,
      selling_price,
      quantity_in_stock,
      quantity_sold,
      CONCAT(first_name, ' ', last_name) author,
      genre
    FROM
      books b
      JOIN authors a ON b.author_id = a.author_id
      JOIN genres g ON b.genre_id = g.genre_id
    WHERE quantity_sold >= 20 AND quantity_sold <= 50
    `);
    return rows;
  } else {
    const { rows } = await pool.query(`
    SELECT
      title,
      selling_price,
      quantity_in_stock,
      quantity_sold,
      CONCAT(first_name, ' ', last_name) author,
      genre
    FROM
      books b
      JOIN authors a ON b.author_id = a.author_id
      JOIN genres g ON b.genre_id = g.genre_id
    WHERE quantity_sold > 50
    `);
    return rows;
  }
}

async function insertBook(
  title,
  first_name,
  last_name,
  genre,
  selling_price,
  quantity_in_stock,
  quantity_sold
) {
  const authorUpsertQuery = `
    WITH existing_author AS (
      SELECT author_id FROM authors WHERE first_name = $1 AND $2 = last_name
    ),
    new_author AS (
      INSERT INTO authors (first_name, last_name)
      SELECT $1, $2
      WHERE NOT EXISTS (SELECT 1 FROM existing_author)
      RETURNING author_id
    )
    SELECT author_id FROM existing_author
    UNION ALL
    SELECT author_id FROM new_author;
  `;
  const authorResult = await pool.query(authorUpsertQuery, [
    first_name,
    last_name,
  ]);
  const author_id = authorResult.rows[0].author_id;

  const genreInsertQuery = `
    WITH inserted AS (
      INSERT INTO genres (genre)
      VALUES ($1)
      ON CONFLICT (genre) DO NOTHING
      RETURNING genre_id
    )
    SELECT genre_id FROM inserted
    UNION ALL
    SELECT genre_id FROM genres
    WHERE genre = $1
    LIMIT 1;
  `;
  const genreResult = await pool.query(genreInsertQuery, [genre]);
  const genre_id = genreResult.rows[0].genre_id;

  const bookInsertQuery = `
    INSERT INTO books (title, selling_price, author_id, genre_id, quantity_in_stock, quantity_sold)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;
  await pool.query(bookInsertQuery, [
    title,
    selling_price,
    author_id,
    genre_id,
    quantity_in_stock,
    quantity_sold,
  ]);
}

module.exports = {
  getAllBooks,
  insertBook,
  getBooksByGenre,
  getBooksByPrice,
  getBooksByQtyInStock,
  getBooksByQtySold,
};
