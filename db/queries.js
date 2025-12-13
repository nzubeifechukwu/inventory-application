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

module.exports = { getAllBooks, insertBook };
