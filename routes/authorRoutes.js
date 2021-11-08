const authorCntlr = require("../controllers/authors");
const express = require("express");
const router = express.Router();

// URL: 3000/author   HTTP: GET
router.get("/", authorCntlr.findAllAuthors);

// URL: 3000/author/1  HTTP: GET
router.get("/:id", authorCntlr.getOneAuthor)

// URL: 3000/author   HTTP: POST
router.post("/", authorCntlr.postNewAuthor);

// URL: 3000/author/1  HTTP: PUT
router.put(authorCntlr.updateAuthor);

// URL: 3000/author/1  HTTP: DELETE
router.delete("/:id", authorCntlr.deleteOne);

module.exports = router;