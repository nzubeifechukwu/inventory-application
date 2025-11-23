const pool = require("./pool");

async function getAllStock() {
  const { rows } = await pool.query(`
        SELECT
          title,
          COALESCE(first_name, ' ', last_name) author,
          genre,
          quantity_in_stock,
          quantity_sold,
          last_updated
        FROM
          books b
          JOIN authors a ON b.author_id = a.author_id
          JOIN genres g ON b.genre_id = g.genre_id
          JOIN inventory i ON b.book_id = i.book_id
          JOIN sale_items s ON b.book_id = s.book_id
        `);
  return rows;
}

module.exports = { getAllStock };
