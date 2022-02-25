const express = require("express");
const router = express.Router();
// the bookCntlr object was exported from controllers, so we access the functions using dot notation
const bookCntlr = require("../controllers/books");

// URL: 3000/book  HTTP: GET
router.get("/", bookCntlr.findAllBooks);

// URL: 3000/book/1  HTTP: GET
router.get("/:id", bookCntlr.getOneBook);

// URL: 3000/book   HTTP: POST
router.post("/", bookCntlr.postNewBook);

// URL: 3000/book/1  HTTP: PUT
router.put("/:id", bookCntlr.updateBook);

// URL: 3000/book/1  HTTP: DELETE
router.delete("/:id", bookCntlr.deleteBook);

module.exports = router;