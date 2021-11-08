# MAKE EXPRESS API/BLOG APP

Create database: `createdb ga_mazon_db`

Create project directory: `mkdir ga_mazon && cd ga_mazon`

Create a node project: `npm init`

Add express framework and install dependencies: `npm i express ejs rowdy-logger sequelize pg`

Add sequelize ORM: `sequelize init`

Create files for server and gitignore: `touch .gitignore server.js`


### make changes to `config/config.json`
```
{
  "development": {
    "database": "ga_mazon_db",
    "host": "127.0.0.1",
    "dialect": "postgresql"
  }
}
```
### make additions to `server.js`
```
const express = require("express");
const app = express();
const rowdy = require("rowdy-logger");
const routesReport = rowdy.begin(app);

const PORT = 3000;
const models = require("./models");

app.use(express.json());

app.get("/", function(req,res) {
    res.send("Hello world");
});

app.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
    routesReport.print();
});
```
### make changes to `package.json` scripts
```
{
  "name": "ga_mazon",
  "version": "1.0.0",
  "description": "practice api for ga class",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "author": "akrg",
  "license": "ISC",
  "dependencies": {
    "ejs": "^3.1.6",
    "express": "^4.17.1",
    "rowdy-logger": "^1.0.2",
    "sequelize": "^6.9.0"
  }
}
```

Create file to save sequelize commands: `touch sequelize.txt`

### make changes to `sequelize.txt`
```
sequelize model:generate --name=book --attributes title:string,genre:string,year:integer,plotSummary:string,authorId:integer
sequelize model:generate --name=author --attributes name:string,birthYear:integer,country:string
sequelize db:migrate
```

Then, run those commands to create the models and migrate the changes to the database ^^^

-- do we need to create associations in the models files?? --

Create controllers directory: `mkdir controllers`

Create files: `touch controllers/books.js controllers/authors.js controllers/index.js`


### make changes to `controllers/books.js`
```
const models = require("../models");
const express = require("express");
const router = express.Router();

router.get("/", async function findAllBooks(req, res){
    const books = await models.book.findAll();
    console.log(books, 'all books from db');
    return books;
});

module.exports = router;
```

### make changes to `controllers/index.js`
```
module.exports = require("./books");
```

### make changes to `server.js`
```
const controllers = require("./controllers");
app.use("/book", controllers);
```

Everything is connected! And now to add the author model...

### make changes to `controllers/author.js`
```
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

module.exports = router;
```

### make changes to `server.js`
```
const bookController = require("./controllers/books");
const authorController = require("./controllers/authors");
app.use("/book", bookController);
app.use("/author", authorController);
```

### make changes to `controllers/books.js`
```
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
module.exports = router;
```

### make changes to `controllers/authors.js`
```
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

module.exports = router;
```

# We can now Create, Read, Update on the author model!

### make changes to `controllers/books.js`
```
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
```

## Now our book model has full CRUD too!