const express = require("express");
const app = express();
const rowdy = require("rowdy-logger");
const routesReport = rowdy.begin(app);

const PORT = 3000;
const models = require("./models");
const bookController = require("./controllers/books");
const authorController = require("./controllers/authors");

app.use(express.json());

app.get("/", function(req,res) {
    res.send("Hello world");
});

app.use("/book", bookController);
app.use("/author", authorController);

app.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
    routesReport.print();
});