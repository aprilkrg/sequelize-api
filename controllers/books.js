const models = require("../models");
const express = require("express");
const router = express.Router();

// URL: 3000/book   HTTP: GET
router.get("/", async function findAllBooks(req, res) {
    const books = await models.book.findAll();
    console.log(books, 'all books from db');
    res.json(books);
    return books;
});

// URL: 3000/book   HTTP: POST
router.post("/", async function postNewBook(req, res) {
    console.log(req.body, 'req.bodyyyy');
    // const newBook = req.body;
    // const newBook = { title, genre, year, plotSummary, authorId };
    const { title, genre, year, plotSummary, authorId } = req.body;
    const createdBook = await models.book.create({
        title, genre, year, plotSummary, authorId
    });
    console.log(createdBook, 'book create');
    res.json(createdBook);
    return createdBook;
});

// URL: 3000/book/1  HTTP: GET
router.get("/:id", async function(req,res) {
    const oneBook = await models.book.findOne({
        where: {
            id: req.params.id
        }
    });
    console.log(oneBook, 'found one');
    res.json(oneBook);
    return oneBook;
});

// URL: 3000/book/1  HTTP: PUT
router.put("/:id", async function(req, res) {
    const updates = req.body;
    const bookToChange = await models.book.findOne({
        where: {
            id: req.params.id
        }
    });
    const changedBook = await bookToChange.update(updates);
    console.log(changedBook);
    res.json(changedBook);
    return changedBook;
});

// URL: 3000/book/1  HTTP: DELETE
router.delete("/:id", async function(req, res){
    const deletedBook = await models.book.destroy({
        where: {
            id: req.params.id
        }
    });
    console.log("Deleted!");
    res.json({deletedBook});
});

module.exports = router;