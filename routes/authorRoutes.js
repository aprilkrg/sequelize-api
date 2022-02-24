// use object destructuring to import function names from object exported from controllers
// this allows for a cleaner syntax for the callback function 
const { findAllAuthors, getOneAuthor, postNewAuthor, updateAuthor, deleteOne } = require("../controllers/authors");
const express = require("express");
const router = express.Router();

// URL: 3000/author   HTTP: GET
router.get("/", findAllAuthors);

// URL: 3000/author/1  HTTP: GET
router.get("/:id", getOneAuthor)

// URL: 3000/author   HTTP: POST
router.post("/", postNewAuthor);

// URL: 3000/author/1  HTTP: PUT
router.put("/:id", updateAuthor);

// URL: 3000/author/1  HTTP: DELETE
router.delete("/:id", deleteOne);

module.exports = router;