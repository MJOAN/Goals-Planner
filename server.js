const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mysql = require("mysql");

const PORT = process.env.PORT || 8080;

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


require("./routes/routes.js")(app);

app.listen(PORT, function() {
    console.log("listening on port", PORT);
})