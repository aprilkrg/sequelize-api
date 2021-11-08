const models = require("../models");
const express = require("express");
const router = express.Router();

// URL: 3000/author   HTTP: GET
router.get("/", async function findAllAuthors(req, res) {
    const authors = await models.author.findAll();
    console.log(authors, 'all authors from db');
    res.json(authors);
    return authors;
});

// URL: 3000/author   HTTP: POST
router.post("/", async function postNewAuthor(req, res) {
    console.log(req.body, 'req.bodyyyy');
    const { name, birthYear, country } = req.body;
    const createdAuthor = await models.author.create({
        name, birthYear, country
    });
    console.log(createdAuthor, 'Author create');
    res.json(createdAuthor);
    return createdAuthor;
});

// URL: 3000/author/1  HTTP: GET
router.get("/:id", async function(req,res) {
    const oneAuthor = await models.author.findOne({
        where: {
            id: req.params.id
        }
    });
    console.log(oneAuthor, 'found one author');
    res.json(oneAuthor);
    return oneAuthor;
});

// URL: 3000/author/1  HTTP: PUT
router.put("/:id", async function(req, res) {
    const updates = req.body;
    const authorToChange = await models.author.findOne({
        where: {
            id: req.params.id
        }
    });
    const changedAuthor = await authorToChange.update(updates);
    console.log(changedAuthor);
    res.json(changedAuthor);
    return changedAuthor;
});

// URL: 3000/author/1  HTTP: DELETE
router.delete("/:id", async function(req, res){
    const deletedAuthor = await models.author.destroy({
        where: {
            id: req.params.id
        }
    });
    console.log("Deleted!");
    res.json({deletedAuthor});
});

module.exports = router;