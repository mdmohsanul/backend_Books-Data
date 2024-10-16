const { initializeDb } = require("./db/db.connect");
const Books = require("./models/book.model");
const express = require("express");
initializeDb();
const app = express();
app.use(cors());

app.use(express.json());

async function getAllBooks() {
  try {
    const books = await Books.find();
    return books;
  } catch (error) {
    throw error;
  }
}
app.get("/books", async (req, res) => {
  try {
    const books = await getAllBooks();
    if (books.length !== 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "No Books data found" });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to get book data" });
  }
});
async function addBookData(data) {
  try {
    const book = new Books(data);
    return book.save();
  } catch (error) {
    throw error;
  }
}

app.post("/books", async (req, res) => {
  try {
    const bookData = await addBookData(req.body);
    res
      .status(200)
      .json({ message: "Book added successfully", book: bookData });
  } catch (error) {
    res.status(500).json({ error: "Failed to adding Books data" });
  }
});

// book details by title

async function bookByTitle(bookTitle) {
  try {
    const book = await Books.findOne({ title: bookTitle });
    return book;
  } catch (error) {
    throw error;
  }
}
app.get("/books/:booktitle", async (req, res) => {
  try {
    const getBook = await bookByTitle(req.params.booktitle);
    if (getBook !== 0) {
      res.json(getBook);
    } else {
      res.status(200).json({ error: "No book found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// book details by author
async function booksByAuthor(bookAuthor) {
  try {
    const books = await Books.find({ author: bookAuthor });
    return books;
  } catch (error) {
    throw error;
  }
}
app.get("/books/author/:bookAuthor", async (req, res) => {
  try {
    const getBook = await booksByAuthor(req.params.bookAuthor);
    if (getBook !== 0) {
      res.json(getBook);
    } else {
      res.status(200).json({ error: "No book found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// book details by genre
async function booksByGenre(bookGenre) {
  try {
    const books = await Books.find({ genre: bookGenre });
    return books;
  } catch (error) {
    throw error;
  }
}
app.get("/books/genre/:bookGenre", async (req, res) => {
  try {
    const getBook = await booksByGenre(req.params.bookGenre);
    if (getBook !== 0) {
      res.json(getBook);
    } else {
      res.status(200).json({ error: "No book found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// book details released in 2012
async function booksByReleaseYear(releaseYear) {
  try {
    const books = await Books.find({ publishedYear: parseInt(releaseYear) });
    return books;
  } catch (error) {
    throw error;
  }
}
app.get("/books/published/:publishedYear", async (req, res) => {
  try {
    const getBook = await booksByReleaseYear(req.params.publishedYear);
    if (getBook !== 0) {
      res.json(getBook);
    } else {
      res.status(200).json({ error: "No book found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// update book rating with id

async function updateRating(bookId, dataToUpdate) {
  try {
    const book = await Books.findByIdAndUpdate(bookId, dataToUpdate);
    return book;
  } catch (error) {
    throw error;
  }
}
app.post("/books/:bookId", async (req, res) => {
  try {
    const updatedBook = await updateRating(req.params.bookId, req.body);
    if (updatedBook) {
      res.status(200).json({ message: "Book update successfully" });
    } else {
      res.status(404).json({ error: "book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book data" });
  }
});
// update book rating with title

async function updateRating(bookTitle, dataToUpdate) {
  try {
    const book = await Books.findOneAndUpdate(
      { title: bookTitle },
      dataToUpdate
    );
    return book;
  } catch (error) {
    throw error;
  }
}
app.post("/books/:bookTitle", async (req, res) => {
  try {
    const updatedBook = await updateRating(req.params.bookTitle, req.body);
    if (updatedBook) {
      res.status(200).json({ message: "Book update successfully" });
    } else {
      res.status(404).json({ error: "book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book data" });
  }
});
// delete book with id

async function deleteBook(bookId) {
  try {
    const book = await Books.findByIdAndDelete(bookId);
    return book;
  } catch (error) {
    throw error;
  }
}
app.delete("/books/:bookId", async (req, res) => {
  try {
    const deletedBook = await deleteBook(req.params.bookId);
    if (deletedBook) {
      res
        .status(200)
        .json({ message: "Book deleted successfully", deletedBook });
    } else {
      res.status(404).json({ error: "Book data not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to load book data" });
  }
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
