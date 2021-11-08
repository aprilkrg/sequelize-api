const models = require("../models");
const express = require("express");
const router = express.Router();

// URL: 3000/author   HTTP: GET
router.get("/", async function findAllAuthors(req, res) {
    try {
        const authors = await models.author.findAll();
        console.log(authors, 'all authors from db');
        res.json(authors);
        return authors;
    } catch(err) {
        res.json(err);
    };
});

// URL: 3000/author   HTTP: POST
router.post("/", async function postNewAuthor(req, res) {
    try {
        console.log(req.body, 'req.bodyyyy');
        const { name, birthYear, country } = req.body;
        const createdAuthor = await models.author.create({
            name, birthYear, country
        });
        console.log(createdAuthor, 'Author create');
        res.json(createdAuthor);
        return createdAuthor;
    } catch(err) {
        res.json(err);
    };
});

// URL: 3000/author/1  HTTP: GET
router.get("/:id", async function(req,res) {
    try {
        const oneAuthor = await models.author.findOne({
            where: {
                id: req.params.id
            }
        });
        console.log(oneAuthor, 'found one author');
        res.json(oneAuthor);
        return oneAuthor;
    } catch(err) {
        res.json(err);
    };
});

// URL: 3000/author/1  HTTP: PUT
router.put("/:id", async function(req, res) {
    try {
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
    } catch(err) {
        res.json(err);
    };
});

// URL: 3000/author/1  HTTP: DELETE
router.delete("/:id", async function(req, res){
    try {
        const deletedAuthor = await models.author.destroy({
            where: {
                id: req.params.id
            }
        });
        console.log("Deleted!");
        res.json({deletedAuthor});
    } catch(err) {
        res.json(err);
    };
});
    
module.exports = router;