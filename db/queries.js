const pool = require("./pool");

async function getAllBooks() {
  const { rows } = await pool.query(`
        SELECT
          book_id id,
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
      book_id id,
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
      book_id id,
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
      book_id id,
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
      book_id id,
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
      book_id id,
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
      book_id id,
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
      book_id id,
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
      book_id id,
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
      book_id id,
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
      book_id id,
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
      book_id id,
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

async function getBookDetails(id) {
  const { rows } = await pool.query(
    `
    SELECT
      book_id id,
      title,
      selling_price,
      quantity_in_stock,
      quantity_sold,
      first_name,
      last_name,
      genre
    FROM
      books b
      JOIN authors a ON b.author_id = a.author_id
      JOIN genres g ON b.genre_id = g.genre_id
    WHERE book_id = $1
    `,
    [id]
  );
  return rows;
}

async function updateBook(
  book_id,
  title,
  first_name,
  last_name,
  genre,
  selling_price,
  quantity_in_stock,
  quantity_sold
) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Handle the Author (Get ID or Insert New)
    const authorRes = await client.query(
      `INSERT INTO authors (first_name, last_name)
       VALUES ($1, $2)
       ON CONFLICT (first_name, last_name) 
       DO UPDATE SET first_name = EXCLUDED.first_name
       RETURNING author_id`,
      [first_name, last_name]
    );
    const authorId = authorRes.rows[0].author_id;

    // 2. Handle the Genre (Get ID or Insert New)
    const genreRes = await client.query(
      `INSERT INTO genres (genre)
       VALUES ($1)
       ON CONFLICT (genre) 
       DO UPDATE SET genre = EXCLUDED.genre
       RETURNING genre_id`,
      [genre]
    );
    const genreId = genreRes.rows[0].genre_id;

    // 3. Update the Book
    const updateBookQuery = `
      UPDATE books 
      SET title = $1, 
          selling_price = $2, 
          author_id = $3, 
          genre_id = $4, 
          quantity_in_stock = $5, 
          quantity_sold = $6
      WHERE book_id = $7
    `;

    await client.query(updateBookQuery, [
      title,
      selling_price,
      authorId,
      genreId,
      quantity_in_stock,
      quantity_sold,
      book_id,
    ]);

    await client.query("COMMIT");
    return { success: true };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error updating book:", err);
    throw err;
  } finally {
    client.release();
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

async function deleteBook(book_id) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Get the author_id and genre_id of the book before we delete it
    const findIdsQuery = `
      SELECT author_id, genre_id 
      FROM books 
      WHERE book_id = $1
    `;
    const res = await client.query(findIdsQuery, [book_id]);

    if (res.rows.length === 0) {
      throw new Error("Book not found");
    }

    const { author_id, genre_id } = res.rows[0];

    // 2. Delete the book
    await client.query("DELETE FROM books WHERE book_id = $1", [book_id]);

    // 3. Cleanup Author: Delete if no other books reference this author
    const cleanupAuthorQuery = `
      DELETE FROM authors 
      WHERE author_id = $1 
      AND NOT EXISTS (SELECT 1 FROM books WHERE author_id = $1)
    `;
    await client.query(cleanupAuthorQuery, [author_id]);

    // 4. Cleanup Genre: Delete if no other books reference this genre
    const cleanupGenreQuery = `
      DELETE FROM genres 
      WHERE genre_id = $1 
      AND NOT EXISTS (SELECT 1 FROM books WHERE genre_id = $1)
    `;
    await client.query(cleanupGenreQuery, [genre_id]);

    await client.query("COMMIT");
    return { success: true };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error deleting book and cleaning up:", err);
    throw err;
  } finally {
    client.release();
  }
}

async function deleteAllBooks() {
  await pool.query("TRUNCATE TABLE genres CASCADE");
  await pool.query("TRUNCATE TABLE authors CASCADE");
}

module.exports = {
  getAllBooks,
  insertBook,
  getBooksByGenre,
  getBooksByPrice,
  getBooksByQtyInStock,
  getBooksByQtySold,
  getBookDetails,
  updateBook,
  deleteBook,
  deleteAllBooks,
};
