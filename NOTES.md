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

# Now our book model has full CRUD too!

# Refactor our controllers to use `try/catch`
We'll be adding these lines to every function in the author and book controllers:
```
try {

} catch(err) {
    res.json(err);
};
```

### make changes to `controllers/authors.js`
```
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
    try {
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
    } catch (err) {
        res.json(err);
    };
});

// URL: 3000/book/1  HTTP: GET
router.get("/:id", async function (req, res) {
    try {
        const oneBook = await models.book.findOne({
            where: {
                id: req.params.id
            }
        });
        console.log(oneBook, 'found one');
        res.json(oneBook);
        return oneBook;

    } catch (err) {
        res.json(err);
    };
});

// URL: 3000/book/1  HTTP: PUT
router.put("/:id", async function (req, res) {
    try {
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

    } catch (err) {
        res.json(err);
    };
});

// URL: 3000/book/1  HTTP: DELETE
router.delete("/:id", async function (req, res) {
    try {
        const deletedBook = await models.book.destroy({
            where: {
                id: req.params.id
            }
        });
        console.log("Deleted!");
        res.json({ deletedBook });
    } catch (err) {
        res.json(err);
    };
});

module.exports = router;
```

# REFACTOR TO MVCR (without the V yet)
## Add routes to breakup controllers
Create directory for routes: `mkdir routes`

Create files for each model in routes: `touch routes/bookRoutes.js routes/authorRoutes.js`

Now we'll be taking the `router` out of the controller, since we're separating concerns. We create a controller object and assign methods to it to handle our CRUD.
### make changes to `controllers/books.js`
```
const models = require("../models");
const bookController = {};

// URL: 3000/book   HTTP: GET
bookController.findAllBooks = async function (req, res) {
    try {
        const books = await models.book.findAll();
        console.log(books, 'all books from db');
        res.json(books);
        return books;
    } catch (err) {
        res.json(err);
    };
};

// URL: 3000/book   HTTP: POST
bookController.postNewBook =  async function(req, res) {
    try {
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
    } catch (err) {
        res.json(err);
    };
};

// URL: 3000/book/1  HTTP: GET
bookController.getOneBook = async function(req, res) {
    try {
        const oneBook = await models.book.findOne({
            where: {
                id: req.params.id
            }
        });
        console.log(oneBook, 'found one');
        res.json(oneBook);
        return oneBook;

    } catch (err) {
        res.json(err);
    };
};

// URL: 3000/book/1  HTTP: PUT
bookController.updateBook = async function(req, res) {
    try {
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

    } catch (err) {
        res.json(err);
    };
};

// URL: 3000/book/1  HTTP: DELETE
bookController.deleteBook = async function(req, res) {
    try {
        const deletedBook = await models.book.destroy({
            where: {
                id: req.params.id
            }
        });
        console.log("Deleted!");
        res.json({ deletedBook });
    } catch (err) {
        res.json(err);
    };
};

module.exports = bookController;
```

### make changes to `routes/bookRoutes.js`
```
const bookCntlr = require("../controllers/books");
const express = require("express");
const router = express.Router();

// URL: 3000/books  HTTP: GET
router.get("/", bookCntlr.findAllBooks);

module.exports = router;
```

### make additions to `server.js`
```
const bookRoutes = require("./routes/bookRoutes");
app.use("/book", bookRoutes);
```

# Now the books model is using MCR separation of concerns!

Keep converting the books controller so all the routes have a corresponding controller.

### make changes to `routes/bookRoutes.js`
```
const bookCntlr = require("../controllers/books");
const express = require("express");
const router = express.Router();

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
```

### make changes to `controllers/authors.js`
```
const models = require("../models");
const authorController = {};

// URL: 3000/author   HTTP: GET
authorController.findAllAuthors = async function(req, res) {
    try {
        const authors = await models.author.findAll();
        console.log(authors, 'all authors from db');
        res.json(authors);
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
        console.log("Deleted!");
        res.json({deletedAuthor});
    } catch(err) {
        res.json(err);
    };
};
    
module.exports = authorController;
```

### make changes to `routes/authorRoutes.js`
``` 
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
```

Connect it all in `server.js`!

### make changes to `server.js`
```
const express = require("express");
const app = express();
const rowdy = require("rowdy-logger");
const routesReport = rowdy.begin(app);

const PORT = 3000;

const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");

app.use(express.json());

app.use("/book", bookRoutes);
app.use("/author", authorRoutes);

app.get("/", function(req,res) {
    res.send("Hello world");
});

app.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
    routesReport.print();
});
```