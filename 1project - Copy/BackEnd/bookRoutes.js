const express = require("express");
const router = express.Router();
const bookController = require("./bookController");

// add book
router.post("/addBook", bookController.addBook);

// search
router.get("/search", bookController.searchBooks);

module.exports = router;