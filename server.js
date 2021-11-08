const express = require("express");
const app = express();
const rowdy = require("rowdy-logger");
const routesReport = rowdy.begin(app);

const PORT = 3000;
// const models = require("./models");
// const bookController = require("./controllers/books");
// const authorController = require("./controllers/authors");
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