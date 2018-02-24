const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mysql = require("mysql");
const PORT = 3000;

const connection = require("./database/connection.js")

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(PORT, function() {
    console.log("listening on port", PORT);
})