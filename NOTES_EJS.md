# Add VIEWS

### first change to a different branch
```zsh
git checkout -b ejs
```
### Then install ejs package.
```zsh
npm i ejs
```

Tell the server to use ejs for the view engine.

### Make these changes to `server.js`
```js
const express = require("express");
const app = express();
const rowdy = require("rowdy-logger");
const routesReport = rowdy.begin(app);

const PORT = 3000;

const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");

app.set("view engine", "ejs");
app.use(express.json());

app.use("/book", bookRoutes);
app.use("/author", authorRoutes);

app.get("/", function(req,res) {
    res.render("index");
});

app.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
    routesReport.print();
});
```
Now we're rendering views!!


Next step: creating a view for each presentational route
- index (home page)
- book index (all books)
- book show (one book)
- book update (one book)
- author index (all authors)
- author show (one author & assoc books)
- author update (one author)


Take this a step at a time by checking the data that is being sent. Change just one controller to test:
### make this change in `controllers/authors.js`
```js
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
```
Then create the ejs file that that route is naming, 
```zsh
touch views/authors.ejs
```
### add these lines to `views/authors.ejs`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Authors</title>
</head>
<body>
    <h1>All Authors</h1>    
</body>
</html>
```
We are sucessfully rendering a view, now let's check that the data being sent in the controller is working like we'd hope.
### make these changes to `views/author.ejs`
```html
<body>
    <h1>All Authors</h1>
    <% authors.forEach(author => { %>
        <h3><%=author.name%> </h3>
    <% }) %> 
</body>
```
Refresh the browser, and we should see the author from our database!