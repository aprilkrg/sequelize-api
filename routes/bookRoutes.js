const { findAllBooks, getOneBook, postNewBook, updateBook, deleteBook } = require("../controllers/books");
const express = require("express");
const router = express.Router();

// URL: 3000/book  HTTP: GET
router.get("/", findAllBooks);

// URL: 3000/book/1  HTTP: GET
router.get("/:id", getOneBook);

// URL: 3000/book   HTTP: POST
router.post("/", postNewBook);

// URL: 3000/book/1  HTTP: PUT
router.put("/:id", updateBook);

// URL: 3000/book/1  HTTP: DELETE
router.delete("/:id", deleteBook);

module.exports = router;