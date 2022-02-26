const models = require("../models");
// create an empty object so we can add properties which are functions
// export object at end of file to be able to use it!
const authorController = {};

// URL: 3000/author   HTTP: GET
authorController.findAllAuthors = async function(req, res) {
    try {
        const authors = await models.author.findAll();
        console.log(authors, 'all authors from db');
        res.render("authors", {authors});
        return authors;
    } catch(err) {
        res.json(err);
    };
};

// URL: 3000/author   HTTP: POST
authorController.postNewAuthor = async function(req, res) {
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
};

// URL: 3000/author/1  HTTP: GET
authorController.getOneAuthor = async function(req,res) {
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
};

// URL: 3000/author/1  HTTP: PUT
authorController.updateAuthor = async function(req, res) {
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
};

// URL: 3000/author/1  HTTP: DELETE
authorController.deleteOne = async function(req, res){
    try {
        const deletedAuthor = await models.author.destroy({
            where: {
                id: req.params.id
            }
        });
        const deletedBooks = await models.book.destroy({
            where: {
                authorId: req.params.id 
            }
        });
        console.log("Deleted!");
        res.json({deletedAuthor, deletedBooks});
    } catch(err) {
        res.json(err);
    };
};
    
module.exports = authorController;

// previously thought I had to export the authorController in this way to use object destructuring in the routes, but I think I was wrong
// exports.findAllAuthors = authorController.findAllAuthors;
// exports.getOneAuthor = authorController.getOneAuthor;
// exports.postNewAuthor = authorController.postNewAuthor;
// exports.updateAuthor = authorController.updateAuthor;
// exports.deleteOne = authorController.deleteOne;