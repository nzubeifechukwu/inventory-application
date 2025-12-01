const { genres } = require("../utils/utils");
const pool = require("./pool");

async function getAllBooks() {
  const { rows } = await pool.query(`
        SELECT
          title,
          COALESCE(first_name, ' ', last_name) author,
          genre
        FROM
          books b
          JOIN authors a ON b.author_id = a.author_id
          JOIN genres g ON b.genre_id = g.genre_id
        `);
  return rows;
}

async function insertBook(title, first_name, last_name, genre) {
  const authorInsertQuery =
    "INSERT INTO authors (first_name, last_name) VALUES ($1, $2) RETURNING author_id";
  const authorResult = await pool.query(authorInsertQuery, [
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
  const genreResult = await pool.query(genreInsertQuery, [
    genres.includes(genre) ? genre : "Other",
  ]);
  const genre_id = genreResult.rows[0].genre_id;

  const bookInsertQuery = `
    INSERT INTO books (title, selling_price, author_id, genre_id)
    VALUES ($1, $2, $3, $4)
  `;
  await pool.query(bookInsertQuery, [title, "30", author_id, genre_id]);
}

module.exports = { getAllBooks, insertBook };
