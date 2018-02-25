const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
// var methodOverride = require("method-override");

const mysql = require("mysql");

const routes = require("./routes/routes.js");

const PORT = process.env.PORT || 8080;

//app.use(methodOverride("_method"));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));
// app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use("/", routes);

require("./database/config.json");

app.listen(PORT, function() {
    console.log("listening on port", PORT);
})