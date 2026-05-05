const Book = require("./bookModel");

// إضافة كتاب
exports.addBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();

  res.send("Book added ✅");
};

// بحث عن كتاب
exports.searchBooks = async (req, res) => {
  const key = req.query.q;

  const books = await Book.find({
    title: { $regex: key, $options: "i" },
  });

  res.json(books);
};