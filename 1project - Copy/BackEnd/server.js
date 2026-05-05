const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const Book = require("./bookModel");

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use("/", require("./bookRoutes"));

// connect DB
connectDB();
app.get("/search", async (req, res) => {
  const key = req.query.q;

  const books = await Book.find({
    title: { $regex: key, $options: "i" }
  });

  res.json(books);
});

// routes
app.use("/", require("./authRoutes"));
app.use("/", require("./contactRoutes"));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
